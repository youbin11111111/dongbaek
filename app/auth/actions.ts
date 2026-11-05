"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "../../utils/supabase/server";

export type AuthState = { error?: string; message?: string };
const LOGIN_ERROR = "이메일 또는 비밀번호가 틀렸습니다";

export async function login(_state: AuthState, form: FormData): Promise<AuthState> {
  const email = String(form.get("email") ?? "").trim();
  const password = String(form.get("password") ?? "");
  if (!email || !password) return { error: LOGIN_ERROR };

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: LOGIN_ERROR };
  } catch {
    return { error: LOGIN_ERROR };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(_state: AuthState, form: FormData): Promise<AuthState> {
  const email = String(form.get("email") ?? "").trim();
  const password = String(form.get("password") ?? "");
  const nickname = String(form.get("nickname") ?? "").trim();
  if (!email || !password || !nickname) return { error: "이메일, 비밀번호, 닉네임을 모두 입력해 주세요." };
  if (password.length < 6) return { error: "비밀번호는 6자 이상 입력해 주세요." };

  try {
    const supabase = await createClient();
    // Keep the no-email-verification signup flow required by the PRD.
    // Do not create an unconfirmed account or send a verification email.
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/settings`, {
      headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY! },
      cache: "no-store",
    });
    if (!response.ok || (await response.json()).mailer_autoconfirm !== true) {
      return { error: "회원가입을 준비 중입니다. 잠시 후 다시 시도해 주세요." };
    }
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { nickname } } });
    if (error) return { error: error.code === "user_already_exists" ? "이미 가입된 이메일입니다." : "회원가입에 실패했습니다. 입력 내용을 확인해 주세요." };
    if (!data.session) return { error: "로그인 상태를 만들지 못했습니다. 잠시 후 다시 시도해 주세요." };
  } catch {
    return { error: "가입 서버에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요." };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function logout(): Promise<AuthState> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) return { error: "로그아웃에 실패했습니다. 다시 시도해 주세요." };
  } catch {
    return { error: "로그아웃에 실패했습니다. 다시 시도해 주세요." };
  }
  revalidatePath("/", "layout");
  return { message: "로그아웃했습니다." };
}

export async function updateNickname(_state: AuthState, form: FormData): Promise<AuthState> {
  const nickname = String(form.get("nickname") ?? "").trim();
  if (!nickname) return { error: "닉네임을 입력해 주세요." };

  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return { error: "로그인이 필요합니다." };
    const { data, error } = await supabase.from("profiles").update({ nickname }).eq("id", user.id).select("nickname").single();
    if (error || !data) return { error: "닉네임을 저장하지 못했습니다. 다시 시도해 주세요." };
  } catch {
    return { error: "닉네임을 저장하지 못했습니다. 다시 시도해 주세요." };
  }

  revalidatePath("/mypage");
  return { message: "닉네임을 수정했습니다." };
}

export async function deleteAccount(): Promise<AuthState> {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return { error: "로그인이 필요합니다." };
    const { error } = await supabase.rpc("delete_own_account");
    if (error) return { error: "탈퇴하지 못했습니다. 다시 시도해 주세요." };
    // The RPC deletes the current account and its sessions. Clear local cookies too.
    await supabase.auth.signOut({ scope: "local" });
  } catch {
    return { error: "탈퇴 처리 중 연결이 끊겼습니다. 메인으로 돌아가 계정 상태를 확인해 주세요." };
  }

  revalidatePath("/", "layout");
  redirect("/");
}
