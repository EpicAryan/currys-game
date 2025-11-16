"use server";

import { createHmac } from "crypto";

const SIGNATURE_VALIDITY_MS = 5 * 60 * 1000; // 5 minutes


export async function generateSignedURL(
  day: string,
  score: string
): Promise<string> {
  const secret = process.env.HMAC_SECRET!;
  const timestamp = Date.now();
  
  const message = `day=${day}&score=${score}&t=${timestamp}`;
  
  const signature = createHmac("sha256", secret)
    .update(message)
    .digest("base64url");

  return `/result?day=${day}&score=${score}&t=${timestamp}&s=${signature}`;
}

export async function verifySignature(
  day: string,
  score: string,
  timestamp: string,
  signature: string
): Promise<boolean> {
  try {
    const secret = process.env.HMAC_SECRET!;
    const ts = parseInt(timestamp, 10);

    const age = Date.now() - ts;
    if (age > SIGNATURE_VALIDITY_MS || age < 0) {
      return false;
    }

    const message = `day=${day}&score=${score}&t=${timestamp}`;
    const expectedSignature = createHmac("sha256", secret)
      .update(message)
      .digest("base64url");

    return signature === expectedSignature;
  } catch {
    return false;
  }
}
