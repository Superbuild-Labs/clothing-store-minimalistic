import { NextResponse } from "next/server";

import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  createSession,
  verifyCredentials,
} from "@/lib/auth";

interface LoginBody {
  email?: unknown;
  password?: unknown;
}

function parseCredentials(body: LoginBody) {
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  return { email, password };
}

export async function POST(request: Request) {
  let body: LoginBody;

  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { email, password } = parseCredentials(body);
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 },
    );
  }

  if (!process.env.DEMO_EMAIL || !process.env.DEMO_PASSWORD || !process.env.SESSION_SECRET) {
    return NextResponse.json(
      { error: "Authentication is not configured." },
      { status: 500 },
    );
  }

  if (!verifyCredentials(email, password)) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const sessionToken = await createSession(email);
  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: sessionToken,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  return response;
}
