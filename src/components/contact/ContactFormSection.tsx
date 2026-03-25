"use client";

import React, { useState } from "react";

interface ContactFormSectionProps {
  info: {
    emails: string[];
    phones: string[];
    address: string[];
    socials: { label: string; href: string }[];
  };
  form: {
    title: string;
    description: string;
    trustNote: string;
    buttonLabel: string;
  };
}

export default function ContactFormSection({
  info,
  form,
}: ContactFormSectionProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    projectType: "Commercial",
    subject: "",
    message: "",
    consent: false,
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, consent: e.target.checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setStatus("success");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        projectType: "Commercial",
        subject: "",
        message: "",
        consent: false,
      });
    } catch (error: any) {
      setStatus("error");
      setErrorMessage(error.message);
    }
  };
  return (
    <section className="relative w-full px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
          {/* Info Side */}
          <div className="space-y-16">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-cyan-300/70">
                Direct Communication
              </h3>
              <div className="mt-8 space-y-8">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">Connect via Email</p>
                  <div className="mt-3 space-y-2">
                    {info.emails.map((email) => (
                      <a
                        key={email}
                        href={`mailto:${email}`}
                        className="block text-xl font-light text-white transition-colors duration-300 hover:text-[#f0a43a] md:text-2xl"
                      >
                        {email}
                      </a>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">Immediate Assistance</p>
                  <div className="mt-3 space-y-2">
                    {info.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone}`}
                        className="block text-xl font-light text-white transition-colors duration-300 hover:text-[#f0a43a] md:text-2xl"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-cyan-300/70">
                Digital Presence
              </h3>
              <div className="mt-8 flex flex-wrap gap-x-12 gap-y-4">
                {info.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/50 transition-colors duration-300 hover:text-white"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="relative border border-white/10 bg-black/40 p-8 backdrop-blur-3xl md:p-12">
            <h3 className="text-2xl font-light tracking-tight text-white md:text-4xl">
              {form.title}
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/50">
              {form.description}
            </p>

            <form className="mt-12 space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/40">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-white/10 bg-transparent py-2 text-white outline-none transition-colors duration-300 focus:border-cyan-300/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/40">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-white/10 bg-transparent py-2 text-white outline-none transition-colors duration-300 focus:border-cyan-300/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/40">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-white/10 bg-transparent py-2 text-white outline-none transition-colors duration-300 focus:border-cyan-300/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/40">Project Type</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-white/10 bg-transparent py-2 text-white outline-none transition-colors duration-300 focus:border-cyan-300/50 appearance-none cursor-pointer"
                  >
                    <option className="bg-[#111]" value="Commercial">Commercial</option>
                    <option className="bg-[#111]" value="Residential">Residential</option>
                    <option className="bg-[#111]" value="Mixed-Use">Mixed-Use</option>
                    <option className="bg-[#111]" value="Institutional">Institutional</option>
                    <option className="bg-[#111]" value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/40">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-white/10 bg-transparent py-2 text-white outline-none transition-colors duration-300 focus:border-cyan-300/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/40">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full border-b border-white/10 bg-transparent py-2 text-white outline-none transition-colors duration-300 focus:border-cyan-300/50 resize-none"
                />
              </div>

              <div className="mt-4 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent"
                  checked={formData.consent}
                  onChange={handleCheckboxChange}
                  className="mt-1 h-3 w-3 accent-cyan-300"
                />
                <label htmlFor="consent" className="text-[10px] text-white/40 leading-snug cursor-pointer select-none">
                  For better service accuracy, I consent to sharing approximate location data (IP-based) with my inquiry.
                </label>
              </div>

              {status === "error" && (
                <p className="text-red-400 text-xs mt-2">{errorMessage}</p>
              )}
              {status === "success" && (
                <p className="text-green-400 text-xs mt-2">Message sent successfully. We will follow up shortly.</p>
              )}

              <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between pt-6">
                <p className="max-w-sm text-[10px] leading-relaxed text-white/30">
                  {form.trustNote}
                </p>
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="inline-flex items-center justify-center border border-[#f0a43a]/40 bg-[#f0a43a]/5 px-10 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#f0a43a] transition-all duration-300 hover:bg-[#f0a43a] hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Sending..." : form.buttonLabel}
                </button>
              </div>
            </form>

            <div className="pointer-events-none absolute left-4 top-4 h-6 w-6 border-l border-t border-white/10" />
            <div className="pointer-events-none absolute right-4 top-4 h-6 w-6 border-r border-t border-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
