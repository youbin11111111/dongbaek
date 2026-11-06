import "server-only";

export async function saveNotificationToSheet(email: string): Promise<boolean> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const token = process.env.GOOGLE_SHEETS_WEBHOOK_TOKEN;
  if (!url && !token) return false;
  if (!url || !token) throw new Error("Incomplete Google Sheets configuration");
  const endpoint = new URL(url);
  if (endpoint.origin !== "https://script.google.com" || !endpoint.pathname.endsWith("/exec")) {
    throw new Error("Invalid Google Sheets endpoint");
  }
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, email, consent: true }),
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok || (await response.json()).success !== true) {
    throw new Error("Google Sheets write failed");
  }
  return true;
}
