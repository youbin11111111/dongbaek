"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const descriptions = [
  "동백꽃이 아직 안 피었다면, 제주 동백마을은 다음에 갈까요?",
  "꽃 사진 한 장은 찍고 싶은데, 그다음엔 뭘 하면 좋을까요?",
  "꽃을 보고 싶다면 1월 중순부터. 신흥2리 돌담길에 토종 동백이 피기 시작해요.",
  "동백기름은 씨앗에서 나와요. 마을 사람들이 함께 세운 방앗간에서 짜요.",
  "동백기름은 무슨 맛일까요? 제주 고사리를 넣은 파스타로 맛볼 수 있어요.",
  "동백마을에서 해볼 세 가지: 돌담길 걷기, 동백기름 방앗간 둘러보기, 고사리 동백오일 파스타 맛보기.",
  "제주 일정 짤 때 보려고 저장해 두세요. 친구와 간다면, 셋 중 어디가 좋을지 물어보세요.",
];

export default function CardNews() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    if (section.current) observer.observe(section.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !visible) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setSlide((current) => (current + 1) % descriptions.length);
    }, 2000);
    return () => window.clearInterval(timer);
  }, [paused, visible]);

  function selectSlide(index: number) {
    setSlide((index + descriptions.length) % descriptions.length);
    setPaused(true);
  }

  return (
    <section ref={section} id="card-news" className="card-news section-pad" aria-label="동백마을 카드뉴스" aria-roledescription="캐러셀">
      <div className="section-caption"><span>DONGBAEK VILLAGE / CARD NEWS</span><span>사진 너머, 마을의 이야기</span></div>
      <div className="card-news-layout">
        <div className="card-news-copy">
          <p className="eyebrow">SEVEN SCENES FROM JEJU</p>
          <h2>동백이 피기 전에도,<br/>만나고 싶은 마을.</h2>
          <p>돌담길을 걷고, 방앗간을 둘러보고,<br/>동백기름의 맛을 만나는 제주 여행.</p>
          <p className="card-news-hint">2초마다 이어지는 동백마을 이야기.<br/>잠시 멈추고 천천히 읽어보세요.</p>
          <div className="card-news-controls">
            <button type="button" onClick={() => selectSlide(slide - 1)} aria-label="이전 카드뉴스">←</button>
            <span>{String(slide + 1).padStart(2, "0")} / 07</span>
            <button type="button" onClick={() => selectSlide(slide + 1)} aria-label="다음 카드뉴스">→</button>
            <button type="button" className="card-news-pause" onClick={() => setPaused(!paused)}>{paused ? "재생 ▶" : "일시정지 Ⅱ"}</button>
          </div>
          <div className="card-news-dots" aria-label="카드뉴스 선택">
            {descriptions.map((_, index) => <button type="button" key={index} aria-label={`${index + 1}번 카드뉴스 보기`} aria-current={slide === index ? "true" : undefined} onClick={() => selectSlide(index)}>{index + 1}</button>)}
          </div>
        </div>
        <div className="card-news-stage" aria-live={paused ? "polite" : "off"}>
          {descriptions.map((description, index) => (
            <div key={index} className={`card-news-slide${slide === index ? " is-active" : ""}`} aria-hidden={slide !== index}>
              <Image src={`/campaign/village-cards/0${index + 1}.png`} alt={`${index + 1}/7. ${description}`} width={1086} height={1448} sizes="(max-width: 760px) 86vw, 480px" loading="eager" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
