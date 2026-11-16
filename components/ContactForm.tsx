"use client";

import { useState } from "react";

type Note = { text: string; color: string } | null;

// Lanceflows contact form (FormSubmit) in the template's appointment-form markup.
export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [note, setNote] = useState<Note>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("https://formsubmit.co/ajax/admin@lanceflows.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !(data.success === "true" || data.success === true)) {
        throw new Error(data.message || "Submission failed");
      }
      setNote({ text: "Thanks! We'll be in touch soon. ✓", color: "#ed1e24" });
      form.reset();
    } catch (err) {
      console.error("Contact form / FormSubmit error:", (err as Error).message);
      setNote({
        text: "Sorry — something went wrong. Please email admin@lanceflows.com directly.",
        color: "#c0455f",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form id="lf-contact-form" className="contact-form mt-30" noValidate onSubmit={onSubmit}>
      {/* FormSubmit config */}
      <input type="hidden" name="_subject" value="New contact — Lanceflows website" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      {/* honeypot: bots fill this, humans never see it */}
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }}
      />
      <div className="row">
        <div className="col-lg-12">
          <div className="contact-field p-relative c-name mb-20">
            <label htmlFor="name" className="sr-only">Name</label>
            <input id="name" name="name" type="text" autoComplete="name" placeholder="Your name" required />
          </div>
        </div>
        <div className="col-lg-12">
          <div className="contact-field p-relative c-subject mb-20">
            <label htmlFor="email" className="sr-only">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" placeholder="you@email.com" required />
          </div>
        </div>
        <div className="col-lg-12">
          <div className="contact-field p-relative c-message mb-30">
            <label htmlFor="msg" className="sr-only">Message</label>
            <textarea id="msg" name="message" rows={4} placeholder="How can we help?" required></textarea>
          </div>
          <div className="slider-btn">
            <button className="btn ss-btn" type="submit" disabled={submitting}>
              <span>{submitting ? "Sending…" : "Send message"}</span>
            </button>
          </div>
          {note && <p style={{ marginTop: 12, fontWeight: 600, color: note.color }}>{note.text}</p>}
        </div>
      </div>
    </form>
  );
}
