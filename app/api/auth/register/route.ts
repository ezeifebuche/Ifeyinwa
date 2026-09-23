import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { pool } from "@/lib/db";
import { createSession } from "@/lib/session";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Bad request" }, { status: 400 });
  }

  const fullName = str(body.fullName);
  const email = str(body.email).toLowerCase();
  const phone = str(body.phone);
  const password = typeof body.password === "string" ? body.password : "";
  const packageSlug = str(body.packageSlug) || null;

  if (fullName.length < 2) {
    return NextResponse.json({ message: "Please enter your full name." }, { status: 400 });
  }
  if (!EMAIL.test(email)) {
    return NextResponse.json(
      { message: "That doesn't look like a valid email address." },
      { status: 400 },
    );
  }
  if (phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json(
      { message: "Enter the number you use on WhatsApp." },
      { status: 400 },
    );
  }
  if (password.length < 8) {
    return NextResponse.json({ message: "Use at least 8 characters." }, { status: 400 });
  }

  try {
    const existing = await pool.query("select id from users where email = $1", [
      email,
    ]);
    if (existing.rows.length > 0) {
      return NextResponse.json(
        { message: "Something went wrong. Try signing in instead." },
        { status: 409 },
      );
    }

    const hash = await bcrypt.hash(password, 12);
    const { rows } = await pool.query(
      `insert into users (full_name, email, phone, password_hash, package_slug)
       values ($1, $2, $3, $4, $5)
       returning id`,
      [fullName, email, phone, hash, packageSlug],
    );

    await createSession(String(rows[0].id));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("register failed", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}