'use client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
/* eslint-disable */

import React, { useState, useEffect, useRef } from 'react';

interface QuotePreset {
  destination?: string;
  offerId?: string;
}

interface QuoteFormProps {
  preset?: QuotePreset;
  onSubmitted?: () => void;
}

export default function QuoteForm({ preset, onSubmitted }: QuoteFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const firstInputRef = useAutoFocus();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    destination: preset?.destination ?? '',
    startDate: '',
    endDate: '',
    travelers: 2,
    notes: '',
    offerId: preset?.offerId ?? '',
  });

  // Reset success/error after 5 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const update = (key: keyof typeof form, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clear error on input
    if (error) setError(null);
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message ?? 'Failed to submit. Please try again.');
      }

      setSuccess('Thank you! We’ll send your personalized quote within 24 hours.');

      // Reset form but preserve preset
      setForm({
        fullName: '',
        email: '',
        phone: '',
        destination: preset?.destination ?? '',
        startDate: '',
        endDate: '',
        travelers: 2,
        notes: '',
        offerId: preset?.offerId ?? '',
      });

      onSubmitted?.();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Network error. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4" noValidate>
      {/* Full Name */}
      <FormField
        label="Full name"
        id="fullName"
        type="text"
        required
        value={form.fullName}
        onChange={(e) => update('fullName', e.target.value)}
        placeholder="John Doe"
        ref={firstInputRef}
      />

      {/* Email */}
      <FormField
        label="Email"
        id="email"
        type="email"
        required
        value={form.email}
        onChange={(e) => update('email', e.target.value)}
        placeholder="john@example.com"
      />

      {/* Phone */}
      <FormField
        label="Phone"
        id="phone"
        type="tel"
        value={form.phone}
        onChange={(e) => update('phone', e.target.value)}
        placeholder="+91 98765 43210"
      />

      {/* Destination */}
      <FormField
        label="Destination"
        id="destination"
        type="text"
        value={form.destination}
        onChange={(e) => update('destination', e.target.value)}
        placeholder="e.g., Bali, Switzerland"
      />

      {/* Start Date */}
      <FormField
        label="Start date"
        id="startDate"
        type="date"
        value={form.startDate}
        onChange={(e) => update('startDate', e.target.value)}
        min={new Date().toISOString().split('T')[0]}
      />

      {/* End Date */}
      <FormField
        label="End date"
        id="endDate"
        type="date"
        value={form.endDate}
        onChange={(e) => update('endDate', e.target.value)}
        min={form.startDate || undefined}
      />

      {/* Travelers */}
      <div>
        <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 mb-1">
          Travelers
        </label>
        <input
          id="travelers"
          type="number"
          min={1}
          max={50}
          value={form.travelers}
          onChange={(e) => update('travelers', Number(e.target.value))}
          className="block w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
          aria-describedby="travelers-help"
        />
        <p id="travelers-help" className="sr-only">Number of people traveling (1–50)</p>
      </div>

      {/* Notes */}
      <div className="md:col-span-2">
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
          Notes (optional)
        </label>
        <textarea
          id="notes"
          rows={3}
          value={form.notes}
          onChange={(e) => update('notes', e.target.value)}
          className="block w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors resize-none"
          placeholder="Special requests, budget, dietary needs..."
        />
      </div>

      {/* Messages */}
      {(success || error) && (
        <div className="md:col-span-2">
          <p
            className={`text-sm font-medium p-3 rounded-lg ${
              success ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'
            }`}
            role="alert"
            aria-live="polite"
          >
            {success || error}
          </p>
        </div>
      )}

      {/* Submit */}
      <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-full bg-black text-white px-6 py-2.5 text-sm font-medium hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          aria-label={loading ? 'Submitting quote request' : 'Submit quote request'}
        >
          {loading ? (
            <>
              <Spinner />
              Submitting…
            </>
          ) : (
            'Get Quote'
          )}
        </button>
        <p className="text-xs text-neutral-500">
          No price shown — we’ll tailor a quote just for you.
        </p>
      </div>
    </form>
  );
}

// Reusable Input Component
const FormField = React.forwardRef<
  HTMLInputElement,
  {
    label: string;
    id: string;
    type: string;
    required?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    min?: string;
  }
>(({ label, id, type, required, value, onChange, placeholder, min }, ref) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      ref={ref}
      id={id}
      type={type}
      required={required}
      value={value}
      onChange={onChange}
      min={min}
      placeholder={placeholder}
      className="block w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
      aria-required={required}
      aria-invalid={false}
    />
  </div>
));
FormField.displayName = 'FormField';

// Auto-focus first input
function useAutoFocus() {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return ref;
}

// Spinner Component
function Spinner() {
  return (
    <svg
      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}