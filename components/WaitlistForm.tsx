"use client";

import { useState } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      // TODO: wire to the real waitlist endpoint once Phase 3 planning
      // starts (see §3.2 of the scoping doc — Community is out of scope
      // for Phase 1/2). For now this just simulates a request.
      await new Promise((res) => setTimeout(res, 600));
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="mt-8 text-[15px] text-paper/70">
        You&apos;re on the list — we&apos;ll email you the moment Community
        opens up.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
    >
      <label htmlFor="waitlist-email" className="sr-only">
        Email address
      </label>
      <input
        id="waitlist-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="flex-1 rounded-full border border-paper/15 bg-paper/5 px-5 py-3 text-[15px] text-paper placeholder:text-paper/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center rounded-full bg-brand-red px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60 motion-reduce:transition-none"
      >
        {status === "loading" ? "Joining…" : "Join the waiting list"}
      </button>

      {status === "error" && (
        <p className="text-sm text-brand-red sm:absolute sm:mt-14">
          Something went wrong — try again in a moment.
        </p>
      )}
    </form>
  );
}