const USER_UUID_KEY = "currys_game_user_uuid";

export function getUserUUID(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(USER_UUID_KEY);
}

export function setUserUUID(uuid: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_UUID_KEY, uuid);
}

export function removeUserUUID(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(USER_UUID_KEY);
}
