"use client";

import { useEffect, useState, useTransition } from "react";
import { createClient } from "../../utils/supabase/client";
import { logout } from "./actions";

export default function AuthLinks() {
  const [nickname, setNickname] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    const supabase = createClient();
    let active = true;
    let request = 0;

    async function load() {
      const current = ++request;
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        let name: string | null = null;
        if (user && !authError) {
          const { data } = await supabase.from("profiles").select("nickname").eq("id", user.id).single();
          name = data?.nickname ?? "회원";
        }
        if (active && current === request) {
          setNickname(name);
          setReady(true);
        }
      } catch {
        if (active && current === request) {
          setReady(true);
          setError("로그인 상태를 확인하지 못했습니다.");
        }
      }
    }

    void load();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      queueMicrotask(() => { if (active) void load(); });
    });
    const refresh = () => void load();
    window.addEventListener("profile-updated", refresh);
    return () => {
      active = false;
      subscription.unsubscribe();
      window.removeEventListener("profile-updated", refresh);
    };
  }, []);

  return (
    <div className="auth-links">
      {!ready ? <span aria-live="polite">확인 중…</span> : nickname ? (
        <>
          <span>{nickname}님</span>
          <a href="/mypage">마이페이지</a>
          <button disabled={pending} onClick={() => startTransition(async () => {
            const result = await logout();
            if (result.error) setError(result.error);
            else window.location.assign("/");
          })}>{pending ? "로그아웃 중…" : "로그아웃"}</button>
        </>
      ) : <><a href="/login">로그인</a><a href="/signup">회원가입</a></>}
      {error && <span role="alert">{error}</span>}
    </div>
  );
}
