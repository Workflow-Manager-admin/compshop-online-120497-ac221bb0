import React, { useState } from "react";

/**
 * ContactFormPage: allows users to send an inquiry to the computer shop.
 */
const BACKEND_API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001"; // Change as needed

// PUBLIC_INTERFACE
function ContactFormPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // PUBLIC_INTERFACE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);
    try {
      const res = await fetch(`${BACKEND_API_BASE}/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error("Failed to send inquiry.");
      setResult({ success: true, message: "Inquiry sent successfully!" });
      setForm({ name: "", email: "", message: "" });
    } catch {
      setResult({ success: false, message: "Failed to send. Please try again later." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="contact-form-section container">
      <h2>Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit} autoComplete="off">
        <label>
          Name:
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input name="email" value={form.email} onChange={handleChange} type="email" required />
        </label>
        <label>
          Message:
          <textarea name="message" value={form.message} onChange={handleChange} required rows={4}></textarea>
        </label>
        <button type="submit" disabled={submitting}>
          {submitting ? "Sending..." : "Send"}
        </button>
      </form>
      {result && (
        <p className={result.success ? "success" : "error"}>{result.message}</p>
      )}
    </section>
  );
}

export default ContactFormPage;
