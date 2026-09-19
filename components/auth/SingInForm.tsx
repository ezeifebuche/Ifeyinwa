"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  /** Where to send the user after a successful sign-in. Already sanitised. */
  next: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignInForm({ next }: Props) {
  const router = useRouter();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const set = (key: keyof typeof values) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setFormError(null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const found: typeof errors = {};
    if (!EMAIL.test(values.email.trim()))
      found.email = "Enter the email you signed up with.";
    if (!values.password) found.password = "Enter your password.";
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    setFormError(null);

    try {
      // TODO: build /api/auth/sign-in — verify the hash, set the session
      // cookie, and rate-limit by IP and by email.
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        // Deliberately vague: never reveal whether the email exists.
        throw new Error(
          res.status === 401
            ? "That email and password don't match."
            : "Something went wrong. Please try again.",
        );
      }

      router.push(next);
      router.refresh();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  };

  const field =
    "w-full rounded-xl border bg-paper/[0.03] px-4 py-3.5 text-[15px] text-paper placeholder:text-paper/50 focus:outline-none focus:ring-1";
  const ok = "border-paper/15 focus:border-brand-red focus:ring-brand-red";
  const bad = "border-err/70 focus:border-err focus:ring-err";

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {formError && (
        <p
          role="alert"
          className="rounded-xl border border-err/40 bg-err/10 px-4 py-3 text-[14px] text-err"
        >
          {formError}
        </p>
      )}

      <div>
        <label htmlFor="email" className="mb-2 block text-[14px] text-paper/70">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoFocus
          value={values.email}
          onChange={set("email")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`${field} ${errors.email ? bad : ok}`}
          placeholder="you@example.com"
        />
        {errors.email && (
          <p id="email-error" className="mt-1.5 text-[13px] text-err">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <div className="mb-2 flex items-baseline justify-between gap-4">
          <label htmlFor="password" className="text-[14px] text-paper/70">
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-[13px] text-paper/65 underline-offset-4 hover:text-paper hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={values.password}
            onChange={set("password")}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
            className={`${field} pr-20 ${errors.password ? bad : ok}`}
            placeholder="Your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-[13px] text-paper/65 hover:text-paper focus-visible:outline-2 focus-visible:outline-brand-red"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.password && (
          <p id="password-error" className="mt-1.5 text-[13px] text-err">
            {errors.password}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-1 rounded-full bg-brand-red px-7 py-4 font-bold text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none"
      >
        {submitting ? "Signing you in…" : "Sign in"}
      </button>

      <p className="border-t border-paper/10 pt-5 text-[15px] text-paper/60">
        New here?{" "}
        <Link
          href="/enrol"
          className="font-semibold text-brand-red underline-offset-4 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}