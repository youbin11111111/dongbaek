"use server";

import { createClient } from "../../utils/supabase/server";

export type NotificationState = { error?: string; success?: boolean };

export async function subscribe(_state: NotificationState, form: FormData): Promise<NotificationState> {
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  if (String(form.get("website") ?? "")) return { error: "신청을 처리하지 못했습니다." };
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "올바른 이메일 주소를 입력해 주세요." };
  }
  if (form.get("consent") !== "on") return { error: "이메일 수집 및 출시 알림 수신에 동의해 주세요." };
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("launch_notifications").insert({ email, consent: true });
    // Keep the response identical for existing addresses to avoid disclosing subscribers.
    if (error && error.code !== "23505") return { error: "신청을 저장하지 못했습니다. 잠시 후 다시 시도해 주세요." };
    return { success: true };
  } catch {
    return { error: "서버에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요." };
  }
}
