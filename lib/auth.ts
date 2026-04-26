export const SESSION_COOKIE_NAME = "eleve-session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

interface SessionPayload {
  email: string;
  exp: number;
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function getSessionSecret() {
  return process.env.SESSION_SECRET?.trim() ?? "";
}

function ensureSessionSecret() {
  const secret = getSessionSecret();
  if (!secret) {
    throw new Error("SESSION_SECRET is not configured.");
  }

  return secret;
}

function toBase64Url(bytes: Uint8Array) {
  const base64 =
    typeof Buffer !== "undefined"
      ? Buffer.from(bytes).toString("base64")
      : btoa(String.fromCharCode(...bytes));

  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padLength = (4 - (normalized.length % 4)) % 4;
  const padded = normalized + "=".repeat(padLength);

  if (typeof Buffer !== "undefined") {
    return new Uint8Array(Buffer.from(padded, "base64"));
  }

  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

async function getHmacKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

async function signValue(value: string) {
  const key = await getHmacKey(ensureSessionSecret());
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(value));

  return toBase64Url(new Uint8Array(signatureBuffer));
}

async function verifySignature(value: string, signature: string) {
  const secret = getSessionSecret();
  if (!secret) {
    return false;
  }

  try {
    const key = await getHmacKey(secret);
    return crypto.subtle.verify("HMAC", key, fromBase64Url(signature), encoder.encode(value));
  } catch {
    return false;
  }
}

function decodeSessionPayload(value: string): SessionPayload | null {
  try {
    const decoded = decoder.decode(fromBase64Url(value));
    const parsed = JSON.parse(decoded) as Partial<SessionPayload>;

    if (
      typeof parsed.email !== "string" ||
      parsed.email.length === 0 ||
      typeof parsed.exp !== "number"
    ) {
      return null;
    }

    return {
      email: parsed.email,
      exp: parsed.exp,
    };
  } catch {
    return null;
  }
}

export function verifyCredentials(email: string, password: string) {
  const expectedEmail = process.env.DEMO_EMAIL?.trim().toLowerCase() ?? "";
  const expectedPassword = process.env.DEMO_PASSWORD ?? "";

  if (!expectedEmail || !expectedPassword) {
    return false;
  }

  return normalizeEmail(email) === expectedEmail && password === expectedPassword;
}

export async function createSession(email: string) {
  const normalizedEmail = normalizeEmail(email);
  const payload: SessionPayload = {
    email: normalizedEmail,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS,
  };

  const payloadPart = toBase64Url(encoder.encode(JSON.stringify(payload)));
  const signaturePart = await signValue(payloadPart);

  return `${payloadPart}.${signaturePart}`;
}

export async function readSession(token: string | null | undefined) {
  if (!token) {
    return null;
  }

  const [payloadPart, signaturePart, ...rest] = token.split(".");
  if (!payloadPart || !signaturePart || rest.length > 0) {
    return null;
  }

  const isValidSignature = await verifySignature(payloadPart, signaturePart);
  if (!isValidSignature) {
    return null;
  }

  const payload = decodeSessionPayload(payloadPart);
  if (!payload) {
    return null;
  }

  const now = Math.floor(Date.now() / 1000);
  if (payload.exp <= now) {
    return null;
  }

  return payload;
}
