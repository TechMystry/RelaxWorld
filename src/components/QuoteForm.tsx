"use client";
import { useState } from "react";

type QuotePreset = {
  destination?: string;
  offerId?: string;
};

export default function QuoteForm({ preset, onSubmitted }: { preset?: QuotePreset; onSubmitted?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    destination: preset?.destination || "",
    startDate: "",
    endDate: "",
    travelers: 2,
    notes: "",
    offerId: preset?.offerId || "",
  });

  const update = (key: keyof typeof form, value: string | number) => setForm((f) => ({ ...f, [key]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to submit");
      setSuccess("Thanks! We’ll reach out with a personalized quote shortly.");
      if (onSubmitted) onSubmitted();
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium">Full name</label>
        <input required value={form.fullName} onChange={(e) => update("fullName", e.target.value)} className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 focus:ring-2 focus:ring-black" />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 focus:ring-2 focus:ring-black" />
      </div>
      <div>
        <label className="block text-sm font-medium">Phone</label>
        <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 focus:ring-2 focus:ring-black" />
      </div>
      <div>
        <label className="block text-sm font-medium">Destination</label>
        <input placeholder="e.g., New Zealand" value={form.destination} onChange={(e) => update("destination", e.target.value)} className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 focus:ring-2 focus:ring-black" />
      </div>
      <div>
        <label className="block text-sm font-medium">Start date</label>
        <input type="date" value={form.startDate} onChange={(e) => update("startDate", e.target.value)} className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 focus:ring-2 focus:ring-black" />
      </div>
      <div>
        <label className="block text-sm font-medium">End date</label>
        <input type="date" value={form.endDate} onChange={(e) => update("endDate", e.target.value)} className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 focus:ring-2 focus:ring-black" />
      </div>
      <div>
        <label className="block text-sm font-medium">Travelers</label>
        <input type="number" min={1} value={form.travelers} onChange={(e) => update("travelers", Number(e.target.value))} className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 focus:ring-2 focus:ring-black" />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium">Notes</label>
        <textarea rows={3} value={form.notes} onChange={(e) => update("notes", e.target.value)} className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 focus:ring-2 focus:ring-black" />
      </div>

      {success && <p className="md:col-span-2 text-green-600 text-sm">{success}</p>}
      {error && <p className="md:col-span-2 text-red-600 text-sm">{error}</p>}

      <div className="md:col-span-2 flex items-center gap-3">
        <button type="submit" disabled={loading} className="rounded-full bg-black text-white px-5 py-2 hover:bg-neutral-800 disabled:opacity-60">
          {loading ? "Submitting…" : "Get Quote"}
        </button>
        <span className="text-xs text-neutral-500">No price shown; we’ll tailor a quote.</span>
      </div>
    </form>
  );
}