"use client";

import { useActionState } from "react";
import { subscribe } from "./actions";

export default function NotificationForm() {
  const [state, action, pending] = useActionState(subscribe, {});
  if (state.success) return <div className="email-success" role="status"><h2>알림 신청을 받았어요.</h2><p>출시 소식을 받을 이메일이 등록됐어요.</p></div>;
  return <form action={action} className="email-notification-form">
    <label htmlFor="notification-email">알림 받을 이메일</label>
    <input id="notification-email" type="email" name="email" placeholder="you@example.com" autoComplete="email" required maxLength={254} disabled={pending} />
    <div className="notification-trap" aria-hidden="true"><label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <label className="notification-consent"><input type="checkbox" name="consent" required disabled={pending} /><span>이메일 수집 및 콜라보 출시 알림 수신에 동의합니다. (선택)</span></label>
    <p className="notification-privacy">수집 항목: 이메일 · 이용 목적: 콜라보 출시 알림<br/>보유 기간: 출시 알림 발송 완료 시까지<br/>동의를 거부할 수 있으며, 거부 시 알림 신청이 제한됩니다.</p>
    {state.error && <p className="notification-error" role="alert">{state.error}</p>}
    <button className="primary-button" type="submit" disabled={pending}>{pending ? "신청하는 중…" : "이메일로 출시 알림받기 →"}</button>
  </form>;
}
