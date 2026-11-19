'use client';

import { useState } from 'react';

// Get your access key at https://formiz.app (free) and put it in .env.local:
// NEXT_PUBLIC_FORMIZ_KEY=your-access-key
const ACCESS_KEY = process.env.NEXT_PUBLIC_FORMIZ_KEY || 'YOUR_ACCESS_KEY';

export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('https://api.formiz.app/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Something went wrong');
      form.reset();
      setStatus('sent');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }

  return (
    <form onSubmit={onSubmit} className="form">
      <input type="hidden" name="access_key" value={ACCESS_KEY} />
      <input type="hidden" name="subject" value="New message from my Next.js site" />
      {/* Honeypot: real visitors never see or fill this field */}
      <input type="checkbox" name="_honey" className="hp" tabIndex={-1} autoComplete="off" />

      <label>
        Name
        <input name="name" required placeholder="Jane Doe" />
      </label>
      <label>
        Email
        <input name="email" type="email" required placeholder="jane@example.com" />
      </label>
      <label>
        Message
        <textarea name="message" rows={5} required placeholder="How can we help?" />
      </label>

      <button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>

      {status === 'sent' && <p className="ok" role="status">Thanks! Your message has been sent.</p>}
      {status === 'error' && <p className="err" role="alert">{error}</p>}
    </form>
  );
}
