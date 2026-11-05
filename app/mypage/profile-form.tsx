"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateNickname, deleteAccount } from "../auth/actions";
import AuthLinks from "../auth/auth-links";

export default function ProfileForm({ email, nickname, profileError }: { email: string; nickname: string; profileError: boolean }) {
  const [state, action, pending] = useActionState(updateNickname, {});
  const [busy, startTransition] = useTransition();
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (state.message) {
      router.refresh();
      window.dispatchEvent(new Event("profile-updated"));
    }
  }, [state, router]);

  return (
    <section className="auth-card">
      <header className="account-header"><a className="auth-brand" href="/">bLOOM</a><AuthLinks /></header>
      <p className="auth-eyebrow">MY PAGE</p>
      <h1>나의 동백마을</h1>
      <p className="auth-description">계정 정보와 닉네임을 확인하세요.</p>
      <div className="profile-email"><span>이메일</span><strong>{email}</strong></div>
      {profileError && <p className="auth-error" role="alert">프로필을 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.</p>}
      <form action={action}>
        <label htmlFor="nickname">닉네임</label>
        <input id="nickname" name="nickname" defaultValue={nickname} required disabled={pending || busy || profileError} />
        {state.error && <p className="auth-error" role="alert">{state.error}</p>}
        {state.message && <p className="auth-success" role="status">{state.message}</p>}
        <button className="auth-submit" disabled={pending || busy || profileError}>{pending ? "저장 중…" : "닉네임 저장"}</button>
      </form>
      <a className="auth-home" href="/">← 메인으로 돌아가기</a>
      {error && <p className="auth-error" role="alert">{error}</p>}
      <div className="account-actions account-delete">
        <button className="delete-account" disabled={busy || pending} onClick={() => {
          if (!window.confirm("회원 탈퇴하시겠습니까? 계정과 프로필이 삭제되며 복구할 수 없습니다.")) return;
          setError("");
          startTransition(async () => { const result = await deleteAccount(); if (result.error) setError(result.error); });
        }}>{busy ? "탈퇴 처리 중…" : "회원 탈퇴"}</button>
      </div>
    </section>
  );
}
