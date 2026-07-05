import "server-only";

const localHosts = new Set(["localhost", "127.0.0.1", "::1"]);

export function isAllowedLocalUrl(value: string) {
  try {
    const url = new URL(value);
    return (
      ["http:", "https:"].includes(url.protocol) && localHosts.has(url.hostname)
    );
  } catch {
    return false;
  }
}

export async function fetchLocalJson<T>(url: string): Promise<T> {
  if (!isAllowedLocalUrl(url)) {
    throw new Error("Seules les API locales sont autorisées dans cette phase.");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);

  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(`API locale indisponible (${response.status}).`);
    }
    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}
