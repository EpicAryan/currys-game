"use server";

import { createHmac } from "crypto"; 

const SIGNATURE_VALIDITY_MS = 15 * 60 * 1000; // 15 minutes

export async function generateGameAccessURL(
  day: number
): Promise<{ url: string; error?: string }> {
  try {
    const secret = process.env.HMAC_SECRET;
    
    if (!secret) {
      throw new Error("HMAC_SECRET not configured");
    }

    const timestamp = Date.now();
    const message = `day=${day}&t=${timestamp}`;
    
    const signature = createHmac("sha256", secret)
      .update(message)
      .digest("base64url");

    const url = `/game/day${day}?t=${timestamp}&s=${signature}`;
    
    return { url };
  } catch (error) {
    console.error("Failed to generate game access URL:", error);
    return { url: "", error: "Failed to generate secure access" };
  }
}

export async function verifyGameAccess(
  day: string,
  timestamp: string,
  signature: string
): Promise<boolean> {
  try {
    const secret = process.env.HMAC_SECRET;
    
    if (!secret) {
      return false;
    }

    const ts = parseInt(timestamp, 10);
    if (isNaN(ts)) {
      return false;
    }

    const age = Date.now() - ts;
    
    if (age > SIGNATURE_VALIDITY_MS) {
      return false;
    }
    
    if (age < 0) {
      return false;
    }

    const message = `day=${day}&t=${timestamp}`;
    
    const expectedSignature = createHmac("sha256", secret)
      .update(message)
      .digest("base64url");

    return signature === expectedSignature;
  } catch (error) {
    console.error("❌ Verification error:", error);
    return false;
  }
}
