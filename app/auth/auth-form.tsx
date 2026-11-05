"use client";
import {useActionState} from "react";
import Image from "next/image";
import {login,signup} from "./actions";
import "./auth.css";
export default function AuthForm({mode}:{mode:"login"|"signup"}){
  const isSignup=mode==="signup";
  const [state,action,pending]=useActionState(isSignup?signup:login,{});
  return <main className="auth-page"><section className="auth-card"><a className="auth-brand" href="/">{isSignup ? "bLOOM" : <Image className="auth-login-logo" src="/campaign/bloom-logo.png" alt="bLOOM" width={1774} height={887} priority />}<span>동백마을 × A20 Lite</span></a><p className="auth-eyebrow">{isSignup?"A NEW BEGINNING":"WELCOME BACK"}</p><h1>{isSignup?"반가워요, 함께 피어나요.":"다시 만나 반가워요."}</h1><p className="auth-description">{isSignup?"나만의 계정으로 동백마을과 함께해요.":"이메일과 비밀번호로 로그인해 주세요."}</p><form action={action}><label htmlFor="email">이메일</label><input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required disabled={pending}/><label htmlFor="password">비밀번호</label><input id="password" name="password" type="password" autoComplete={isSignup?"new-password":"current-password"} minLength={isSignup?6:undefined} placeholder={isSignup?"6자 이상 입력해 주세요":"비밀번호를 입력해 주세요"} required disabled={pending}/>{isSignup&&<><label htmlFor="nickname">닉네임</label><input id="nickname" name="nickname" autoComplete="nickname" placeholder="어떤 이름으로 불러드릴까요?" required disabled={pending}/></>}{state.error&&<p className="auth-error" role="alert">{state.error}</p>}<button className="auth-submit" disabled={pending}>{pending?"잠시만 기다려 주세요…":isSignup?"회원가입":"로그인"}</button></form><p className="auth-switch">{isSignup?"이미 계정이 있으신가요?":"아직 계정이 없으신가요?"} <a href={isSignup?"/login":"/signup"}>{isSignup?"로그인":"회원가입"} →</a></p><a className="auth-home" href="/">← 메인으로 돌아가기</a></section></main>
}

