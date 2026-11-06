"use client";

import { useEffect, useRef } from "react";

export default function LandingVideo() {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const player = video.current;
    if (!player) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    function updatePlayback() {
      if (!player) return;
      if (reducedMotion.matches) player.pause();
      else void player.play().catch(() => { /* Native controls remain available if autoplay is blocked. */ });
    }
    player.muted = true;
    updatePlayback();
    reducedMotion.addEventListener("change", updatePlayback);
    return () => reducedMotion.removeEventListener("change", updatePlayback);
  }, []);

  return (
    <section className="landing-film" aria-label="동백마을 랜딩 영상">
      <video ref={video} width={1280} height={720} muted loop playsInline controls preload="auto" aria-label="동백마을 소개 영상. 재생과 소리를 조절할 수 있습니다.">
        <source src="/campaign/landing-film.mp4" type="video/mp4" />
        영상을 재생할 수 없습니다. <a href="/campaign/landing-film.mp4">영상 파일 열기</a>
      </video>
    </section>
  );
}
