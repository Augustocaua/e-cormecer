export function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export function stripTags(value: string) {
  return value.replace(/<[^>]*>/g, "");
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function sanitizeForSearch(value: string) {
  const cleaned = normalizeWhitespace(value)
    .replace(/[<>"'`]/g, "")
    .slice(0, 100);
  return cleaned;
}

export function isValidSearchQuery(value: string) {
  const v = normalizeWhitespace(value);
  return v.length >= 1;
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidPhone(value: string) {
  return /^[+]?\d[\d\s().-]{6,}$/.test(value);
}

export function isValidName(value: string) {
  const v = normalizeWhitespace(value);
  return v.length >= 2 && v.length <= 100;
}

export function isSafeUrl(value: string) {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol);
  } catch {
    return false;
  }
}

export function clampLength(value: string, max = 200) {
  return value.slice(0, max);
}