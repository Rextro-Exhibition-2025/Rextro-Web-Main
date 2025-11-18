"use client";

import React, { useState } from "react";
import Footer from "@/components/Homepage/Footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="-mt-16 flex flex-auto font-[family-name:var(--font-instrument-sans)] flex-col overflow-hidden pt-16">
      <div className="flex flex-auto flex-col mx-auto w-full px-6 py-12 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[80rem]">
        <main className="relative flex flex-auto flex-col pt-20" id="main">
          <h1 className="text-sm font-medium text-purple-500">Contact</h1>
          <p className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-4 mt-4 font-bold text-gray-950 sm:text-lg md:text-6xl">Anything to know?</p>
          <p className="mt-4 max-w-lg text-lg text-gray-600">
            Feel free to contact us. We value the power of communication and would be delighted to hear from you. Whether you're interested in participating, becoming a sponsor, have questions about the exhibition, or simply wish to give us feedback, we're here to help.
          </p>

          <div className="font-[family-name:var(--font-instrument-sans)] relative isolate mt-16 flex-auto">
            {/* Background container with decorative borders */}
            <div className="absolute inset-x-0 top-0 -z-10 h-full rounded-xl bg-white shadow-[0_10px_32px_rgba(34,42,53,0.15),0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.08),0_24px_68px_rgba(47,48,55,0.1)] ring-1 ring-gray-950/5 lg:max-h-[calc(717/16*1rem)]">
              <div className="absolute -inset-x-20 bottom-[calc(-93/16*1rem)] -z-10 h-[min(55%,calc(440/16*1rem))] bg-gradient-to-t from-gray-50 from-55% to-95%" />
              
              {/* Top border */}
              <div 
                className="absolute opacity-30 inset-x-0 h-px -top-px" 
                style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 1'%3E%3Crect width='1' height='1' fill='%23212126'/%3E%3C/svg%3E\")",
                  WebkitMaskImage: "linear-gradient(to right, transparent, white 7rem, white calc(100% - 7rem), transparent)",
                  maskImage: "linear-gradient(to right, transparent, white 7rem, white calc(100% - 7rem), transparent)",
                  marginLeft: "-7rem",
                  marginRight: "-7rem"
                }}
              />
              
              {/* Left border */}
              <div 
                className="absolute opacity-30 inset-y-0 w-px -left-px" 
                style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 4'%3E%3Crect width='1' height='1' fill='%23212126'/%3E%3C/svg%3E\")",
                  WebkitMaskImage: "linear-gradient(to bottom, transparent, white 5rem, white calc(100% - 5rem), transparent)",
                  maskImage: "linear-gradient(to bottom, transparent, white 5rem, white calc(100% - 5rem), transparent)",
                  marginTop: "-5rem",
                  marginBottom: "-5rem"
                }}
              />
              
              {/* Right border */}
              <div 
                className="absolute opacity-30 inset-y-0 w-px -right-px" 
                style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 4'%3E%3Crect width='1' height='1' fill='%23212126'/%3E%3C/svg%3E\")",
                  WebkitMaskImage: "linear-gradient(to bottom, transparent, white 5rem, white calc(100% - 5rem), transparent)",
                  maskImage: "linear-gradient(to bottom, transparent, white 5rem, white calc(100% - 5rem), transparent)",
                  marginTop: "-5rem",
                  marginBottom: "-5rem"
                }}
              />

              {/* Center divider */}
              <div className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 hidden lg:block">
                <div 
                  className="absolute opacity-30 inset-y-0 w-px -left-px" 
                  style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 4'%3E%3Crect width='1' height='1' fill='%23212126'/%3E%3C/svg%3E\")",
                    WebkitMaskImage: "linear-gradient(to bottom, transparent, white 5rem, white calc(100% - 5rem), transparent)",
                    maskImage: "linear-gradient(to bottom, transparent, white 5rem, white calc(100% - 5rem), transparent)",
                    marginTop: "-5rem",
                    marginBottom: "-5rem"
                  }}
                />
              </div>
            </div>

            {/* Grid layout: left content, right form */}
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Side - Contact Information */}
              <div className="px-6 pt-20 sm:px-20 space-y-12">
                {/* Quick Contact Cards */}
                <div className="space-y-6">
                  <div className="flex flex-col rounded-2xl bg-gray-25 p-6">
                    <h2 className="flex gap-x-2 text-sm/5 font-medium text-gray-950">
                      <svg className="h-5 w-5 flex-none" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                      Email Us
                    </h2>
                    <p className="mb-auto mt-2 text-sm/5 text-gray-600">Send us an email for any inquiries</p>
                    <div className="mt-4">
                      <a 
                        href="mailto:info@rextro.lk" 
                        className="group relative isolate inline-flex items-center justify-center overflow-hidden text-left font-medium transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] before:transition-opacity text-gray-950 text-sm"
                      >
                        info@rextro.lk
                        <svg viewBox="0 0 10 10" aria-hidden="true" className="ml-2 h-2.5 w-2.5 flex-none opacity-60 group-hover:translate-x-6 group-hover:opacity-0 transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)]">
                          <path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m7.25 5-3.5-2.25v4.5L7.25 5Z" />
                        </svg>
                        <svg viewBox="0 0 10 10" aria-hidden="true" className="-ml-2.5 h-2.5 w-2.5 flex-none -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)]">
                          <path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m7.25 5-3.5-2.25v4.5L7.25 5Z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col rounded-2xl bg-gray-25 p-6">
                    <h2 className="flex gap-x-2 text-sm/5 font-medium text-gray-950">
                      <svg className="h-5 w-5 flex-none" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                      Call Us
                    </h2>
                    <p className="mb-auto mt-2 text-sm/5 text-gray-600">Reach out to us via phone</p>
                    <div className="mt-4">
                      <a 
                        href="tel:+94112650301" 
                        className="group relative isolate inline-flex items-center justify-center overflow-hidden text-left font-medium transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] before:transition-opacity text-gray-950 text-sm"
                      >
                        +94 11 265 0301
                        <svg viewBox="0 0 10 10" aria-hidden="true" className="ml-2 h-2.5 w-2.5 flex-none opacity-60 group-hover:translate-x-6 group-hover:opacity-0 transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)]">
                          <path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m7.25 5-3.5-2.25v4.5L7.25 5Z" />
                        </svg>
                        <svg viewBox="0 0 10 10" aria-hidden="true" className="-ml-2.5 h-2.5 w-2.5 flex-none -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)]">
                          <path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m7.25 5-3.5-2.25v4.5L7.25 5Z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col rounded-2xl bg-gray-25 p-6">
                    <h2 className="flex gap-x-2 text-sm/5 font-medium text-gray-950">
                      <svg className="h-5 w-5 flex-none" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      Visit Us
                    </h2>
                    <p className="mb-auto mt-2 text-sm/5 text-gray-600">Faculty of Engineering, University of Ruhuna</p>
                    <span><p className="mb-auto mt-2 text-sm/5 text-gray-600">Hapugala, Wakwella Rd,</p></span>
                    <span><p className="mb-auto mt-2 text-sm/5 text-gray-600">Galle, Sri Lanka</p></span>

                    <div className="mt-4">
                      <a 
                        href="https://maps.app.goo.gl/DXfhXgTUx3TwhMYB6" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="group relative isolate inline-flex items-center justify-center overflow-hidden text-left font-medium transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] before:transition-opacity text-gray-950 text-sm"
                      >
                        Get Directions
                        <svg viewBox="0 0 10 10" aria-hidden="true" className="ml-2 h-2.5 w-2.5 flex-none opacity-60 group-hover:translate-x-6 group-hover:opacity-0 transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)]">
                          <path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m7.25 5-3.5-2.25v4.5L7.25 5Z" />
                        </svg>
                        <svg viewBox="0 0 10 10" aria-hidden="true" className="-ml-2.5 h-2.5 w-2.5 flex-none -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)]">
                          <path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m7.25 5-3.5-2.25v4.5L7.25 5Z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Contact Form */}
              <div className="px-6 pt-20 sm:px-20">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-left text-sm/5 font-medium text-gray-950 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      required
                      className="w-full rounded-md border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-left text-sm/5 font-medium text-gray-950 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="name"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                      className="w-full rounded-md border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 transition-all"
                    />
                  </div>

                  {/* Type */}
                  <div>
                    <label htmlFor="type" className="block text-left text-sm/5 font-medium text-gray-950 mb-2">
                      Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 transition-all"
                    >
                      <option value="">Select Type</option>
                      <option value="sponsorship">Sponsorship</option>
                      <option value="participation">Participation</option>
                      <option value="general">General Inquiry</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phone" className="block text-left text-sm/5 font-medium text-gray-950 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="w-full rounded-md border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-left text-sm/5 font-medium text-gray-950 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Message"
                      rows={6}
                      required
                      className="w-full rounded-md border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-start">
                    <button
                      type="submit"
                      className="group relative isolate inline-flex items-center justify-center overflow-hidden text-left font-medium transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] before:transition-opacity rounded-md shadow-[0_1px_theme(colors.white/0.07)_inset,0_1px_3px_theme(colors.gray.900/0.2)] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-gradient-to-b before:from-white/20 before:opacity-50 hover:before:opacity-100 after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-md after:bg-gradient-to-b after:from-white/10 after:from-[46%] after:to-[54%] after:mix-blend-overlay text-sm h-[1.875rem] px-3 ring-1 bg-gray-900 text-white ring-gray-900"
                    >
                      Send
                      <svg viewBox="0 0 10 10" aria-hidden="true" className="ml-2 h-2.5 w-2.5 flex-none opacity-60 group-hover:translate-x-6 group-hover:opacity-0 transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)]">
                        <path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m7.25 5-3.5-2.25v4.5L7.25 5Z" />
                      </svg>
                      <svg viewBox="0 0 10 10" aria-hidden="true" className="-ml-2.5 h-2.5 w-2.5 flex-none -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)]">
                        <path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m7.25 5-3.5-2.25v4.5L7.25 5Z" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
