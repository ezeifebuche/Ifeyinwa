"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  /** Carried through checkout so the student lands on the right package. */
  packageSlug: string;
};

type Errors = Partial<Record<"fullName" | "email" | "phone" | "password", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupForm({ packageSlug }: Props) {
  const router = useRouter();
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const set = (key: keyof typeof values) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (values.fullName.trim().length < 2)
      next.fullName = "Please enter your full name.";
    if (!EMAIL.test(values.email.trim()))
      next.email = "That doesn't look like a valid email address.";
    if (values.phone.replace(/\D/g, "").length < 10)
      next.phone = "Enter the number you use on WhatsApp.";
    if (values.password.length < 8)
      next.password = "Use at least 8 characters.";
    return next;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    setFormError(null);

    try {
      // TODO: build /api/auth/register — hash the password, create the User
      // record (role: student), send the verification email, start a session.
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, packageSlug }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message ?? "Something went wrong. Please try again.");
      }

      router.push(`/enrol/details?package=${packageSlug}`);
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
      setSubmitting(false);
    }
  };

  const field =
    "w-full rounded-xl border bg-paper/[0.03] px-4 py-3.5 text-[15px] text-paper placeholder:text-paper/35 focus:outline-none focus:ring-1";
  const ok = "border-paper/15 focus:border-brand-red focus:ring-brand-red";
  const bad = "border-red-500/70 focus:border-red-500 focus:ring-red-500";

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {formError && (
        <p
          role="alert"
          className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-[14px] text-red-200"
        >
          {formError}
        </p>
      )}

      <div>
        <label htmlFor="fullName" className="mb-2 block text-[14px] text-paper/70">
          Full name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          value={values.fullName}
          onChange={set("fullName")}
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          className={`${field} ${errors.fullName ? bad : ok}`}
          placeholder="Chidinma Okeke"
        />
        {errors.fullName && (
          <p id="fullName-error" className="mt-1.5 text-[13px] text-red-300">
            {errors.fullName}
          </p>
        )}
      </div>

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
          value={values.email}
          onChange={set("email")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : "email-hint"}
          className={`${field} ${errors.email ? bad : ok}`}
          placeholder="you@example.com"
        />
        {errors.email ? (
          <p id="email-error" className="mt-1.5 text-[13px] text-red-300">
            {errors.email}
          </p>
        ) : (
          <p id="email-hint" className="mt-1.5 text-[13px] text-paper/40">
            Your receipt and lesson notifications go here.
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="mb-2 block text-[14px] text-paper/70">
          WhatsApp number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={set("phone")}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "phone-error" : "phone-hint"}
          className={`${field} ${errors.phone ? bad : ok}`}
          placeholder="0803 000 0000"
        />
        {errors.phone ? (
          <p id="phone-error" className="mt-1.5 text-[13px] text-red-300">
            {errors.phone}
          </p>
        ) : (
          <p id="phone-hint" className="mt-1.5 text-[13px] text-paper/40">
            Class reminders and your House Captain reach you here.
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-[14px] text-paper/70">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            value={values.password}
            onChange={set("password")}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : "password-hint"}
            className={`${field} pr-20 ${errors.password ? bad : ok}`}
            placeholder="At least 8 characters"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-[13px] text-paper/60 hover:text-paper"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.password ? (
          <p id="password-error" className="mt-1.5 text-[13px] text-red-300">
            {errors.password}
          </p>
        ) : (
          <p id="password-hint" className="mt-1.5 text-[13px] text-paper/40">
            At least 8 characters. A short phrase beats a clever word.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-1 rounded-full bg-brand-red px-7 py-4 font-bold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none"
      >
        {submitting ? "Creating your account…" : "Create account"}
      </button>

      <p className="text-[13px] text-paper/45">
        By creating an account you agree to our{" "}
        <Link href="/terms" className="underline underline-offset-2 hover:text-paper">
          terms
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-paper">
          privacy policy
        </Link>
        .
      </p>

      <p className="border-t border-paper/10 pt-5 text-[15px] text-paper/60">
        Already have an account?{" "}
        <Link
          href={`/sign-in?next=${encodeURIComponent(`/enrol/details?package=${packageSlug}`)}`}
          className="font-semibold text-brand-red underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}