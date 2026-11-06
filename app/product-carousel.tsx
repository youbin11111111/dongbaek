"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Product = { image: string; name: string; en: string; text: string };
type Props = {
  id: string;
  title: string;
  eyebrow: string;
  caption: string;
  description: string;
  products: Product[];
};

export default function ProductCarousel({ id, title, eyebrow, caption, description, products }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ index: 1, start: true, end: false });

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const update = () => {
      const card = element.querySelector<HTMLElement>("article");
      const step = card ? card.offsetWidth + parseFloat(getComputedStyle(element).columnGap) : 1;
      setPosition({
        index: Math.min(products.length, Math.round(element.scrollLeft / step) + 1),
        start: element.scrollLeft <= 2,
        end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 2,
      });
    };
    update();
    element.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => { element.removeEventListener("scroll", update); observer.disconnect(); };
  }, [products.length]);

  function move(direction: number) {
    const element = track.current;
    const card = element?.querySelector<HTMLElement>("article");
    if (!element || !card) return;
    const gap = parseFloat(getComputedStyle(element).columnGap);
    element.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return (
    <section id={id} className={`collection section-pad ${id === "collab" ? "collab-collection" : ""}`} aria-labelledby={`${id}-title`}>
      <div className="section-caption"><span>{caption}</span><span>{products.length}가지 작은 설렘</span></div>
      <div className="section-heading">
        <div><p className="eyebrow">{eyebrow}</p><h2 id={`${id}-title`}>{title}</h2></div>
        <p>{description}</p>
      </div>
      <div className="carousel-toolbar">
        <span>옆으로 넘겨, 하나씩 만나보세요.</span>
        <div className="carousel-arrows">
          <span aria-live="polite">{String(position.index).padStart(2,"0")} / {String(products.length).padStart(2,"0")}</span>
          <button onClick={() => move(-1)} disabled={position.start} aria-label={`${title} 이전 상품`} aria-controls={`${id}-track`}>←</button>
          <button onClick={() => move(1)} disabled={position.end} aria-label={`${title} 다음 상품`} aria-controls={`${id}-track`}>→</button>
        </div>
      </div>
      <div id={`${id}-track`} ref={track} className="products product-track" role="region" aria-label={`${title} 슬라이더`} tabIndex={0} onKeyDown={event => {
        if (event.target !== event.currentTarget) return;
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
      }}>
        {products.map((product, index) => (
          <article className="product" key={product.image} aria-label={`${index+1}/${products.length} ${product.name}`}>
            <div className="product-image"><Image src={`/campaign/${product.image}.webp`} alt={product.name} fill sizes="(max-width:760px) 77vw, 34vw" />{id === "collab" && <span className="product-badge">출시 예정</span>}<span className="product-index">0{index+1}</span></div>
            <p className="product-en">{product.en}</p><h3>{product.name}</h3><p>{product.text}</p>
          </article>
        ))}
      </div>
      <div className="collection-bottom"><p>{id === "collab" ? "제품 구성과 출시 일정은 추후 공개됩니다." : "동백마을의 색을 담은 굿즈를 만나보세요."}</p></div>
    </section>
  );
}

