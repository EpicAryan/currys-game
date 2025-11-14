"use client";

const USER_EMAIL_KEY = "user_email";

export function getUserEmail(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(USER_EMAIL_KEY);
}

export function setUserEmail(email: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_EMAIL_KEY, email);
}