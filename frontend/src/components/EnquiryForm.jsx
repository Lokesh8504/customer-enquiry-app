import { useState } from "react";
import { createEnquiry } from "../api";

export default function EnquiryForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.email || !form.phone || !form.message) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      await createEnquiry(form);
      setSuccess("Enquiry submitted successfully.");
      setForm({ name: "", email: "", phone: "", message: "" });
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      setError("Failed to submit enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
          {error}
        </p>
      )}
      {success && (
        <p className="text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-md px-3 py-2">
          {success}
        </p>
      )}

      <div className="grid gap-3">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="name"
            className="text-xs font-medium text-slate-700"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. John Doe"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="text-xs font-medium text-slate-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            value={form.email}
            onChange={handleChange}
            placeholder="e.g. john@example.com"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="phone"
            className="text-xs font-medium text-slate-700"
          >
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            value={form.phone}
            onChange={handleChange}
            placeholder="e.g. +91 98765 43210"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="message"
            className="text-xs font-medium text-slate-700"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="w-full min-h-[90px] rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none resize-y focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            value={form.message}
            onChange={handleChange}
            placeholder="How can we help?"
            required
          />
        </div>
      </div>

      <div className="flex justify-end pt-1">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center rounded-full bg-indigo-600 px-4 py-1.5 text-xs font-medium text-white shadow-md shadow-indigo-300 hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "Submit Enquiry"}
        </button>
      </div>
    </form>
  );
}
