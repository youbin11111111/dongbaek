"use client";
import Image from "next/image";
import LandingVideo from "./landing-video";
import ProductCarousel from "./product-carousel";
import CardNews from "./card-news";
import NotificationForm from "./notifications/notification-form";
import AuthLinks from "./auth/auth-links";
import { useEffect, useRef, useState } from "react";
function Flower({className=""}:{className?:string}){return <svg className={className} viewBox="0 0 100 100" aria-hidden="true"><g fill="currentColor">{[0,72,144,216,288].map(a=><ellipse key={a} cx="50" cy="30" rx="20" ry="27" transform={`rotate(${a} 50 50)`}/>)}</g><path d="M50 35C44 45 40 49 40 56a10 10 0 0020 0c0-7-4-11-10-21Z" fill="#fff8e9"/><path d="M50 43c-4 7-6 9-6 13a6 6 0 0012 0c0-4-2-6-6-13Z" fill="#e7b448"/></svg>}
export default function Home(){
 const [slide,setSlide]=useState(0),[notice,setNotice]=useState(false),[bloomed,setBloomed]=useState(false);
 const story=useRef<HTMLElement>(null),dialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setBloomed(true)},{threshold:.35});if(story.current)o.observe(story.current);return()=>o.disconnect()},[]);
 useEffect(()=>{if(notice)dialog.current?.showModal();else dialog.current?.close()},[notice]);
 const heroes=["hero","lifestyle-cup","lifestyle-keyring"];
 return <><LandingVideo/><header className="site-header"><a href="#" className="brand" aria-label="bLOOM 처음으로">bL<Flower/>OM<span>동백마을 × A20 Lite</span></a><nav aria-label="주요 메뉴"><a href="#story">우리의 이야기</a><a href="#collection">굿즈 컬렉션</a><button className="nav-notify" onClick={()=>setNotice(true)}>알림받기 ↗</button><AuthLinks/></nav></header>
 <main><section className="hero"><div className="hero-copy"><p className="eyebrow">● &nbsp; A LITTLE JEJU, IN YOUR EVERYDAY</p><h1>동백숲의 이야기가,<br/>당신의 일상에<br/><span>피어납니다.</span></h1><p className="hero-description">제주의 작은 마을에서 발견한 아름다움.<br/>동백마을과 A20 Lite가 함께 담아낸<br/>조금 더 다정한 일상을 만나보세요.</p><button className="primary-button" onClick={()=>setNotice(true)}>콜라보 출시 알림받기 <span>↗</span></button><p className="subnote">COMING SOON · 이메일로 만나요</p><div className="hero-bottom"><span>동백마을 × A20 Lite</span><a href="#story">천천히, 둘러보기 ↓</a></div></div><div className="hero-visual"><Image src={`/campaign/${heroes[slide]}.webp`} alt={["동백꽃 bLOOM 로고가 담긴 아이보리 에코백","일상 속 bLOOM 텀블러","에코백에 달린 투명 bLOOM 키링"][slide]} fill priority sizes="(max-width:760px) 100vw, 55vw" className="hero-photo"/><div className="edition">A VILLAGE IN BLOOM<br/><span>동백을 담은 첫 번째 만남</span></div><div className="photo-tag"><Flower/><span>From the village,<br/><b>with love.</b></span></div><div className="slide-controls"><span>0{slide+1} <i>/ 03</i></span><div>{heroes.map((_,i)=><button key={i} onClick={()=>setSlide(i)} className={slide===i?"active":""} aria-label={`${i+1}번 제품 사진 보기`} aria-pressed={slide===i}/>)}</div><button onClick={()=>setSlide((slide+1)%3)} aria-label="다음 사진">→</button></div></div></section>
 <div className="ribbon" aria-hidden="true"><span>ROOTED IN JEJU</span><Flower/><span>MADE TO BLOOM</span><Flower/><span>동백을 담다, 일상에 피다</span><Flower/><span>ROOTED IN JEJU</span><Flower/><span>MADE TO BLOOM</span></div>
 <section className="intro section-pad" id="story"><div className="section-caption"><span>01 / OUR STORY</span><span>마을에서 시작된 작은 변화</span></div><div className="intro-grid"><div className="intro-title"><p className="eyebrow">HELLO, I’M BAEKSONGI</p><h2>반가워요.<br/>저는 동백마을의<br/>홍보 요정<br/><em>백송이</em>에요.</h2></div><div className="mascot-scene"><span className="mascot-halo"/><Image src="/campaign/baeksongi-main.png" alt="동백꽃 모자와 별 지팡이를 든 백송이" width={1080} height={1440} className="mascot"/><Flower className="scene-flower"/></div><div className="intro-text"><span className="quote-mark">“</span><h3>아름다운 건,<br/>가까이 두고 싶으니까.</h3><p>동백의 붉은 빛, 잎사귀의 짙은 초록,<br/>마을을 닮은 따뜻하고 소박한 결.</p><p>백송이와 함께 그 작은 아름다움을 찾아가요.<br/>동백마을과 A20 Lite의 만남은<br/>마을의 이야기를 일상으로 이어갑니다.</p></div></div></section>
 <section ref={story} id="bloom" className={`bloom-story ${bloomed?"is-bloomed":""}`}><p className="eyebrow">A FOREST BECOMES A SYMBOL</p><h2>너의 방식대로 피어나</h2><div className="logo-stage" role="img" aria-label="동백요정의 빛과 꽃잎이 모여 bLOOM 로고가 피어나는 장면"><div className="forest-lines"/>{Array.from({length:8},(_,i)=><span className={`fairy fairy-${i}`} key={i}><Flower/></span>)}<div className="bloom-wordmark"><span>bL</span><Flower/><span>OM</span></div></div><p className="bloom-caption">동백숲에 머물던 작은 요정들이 꽃잎이 되어 모입니다.<br/>그 마음을 담은 이름, <strong>bLOOM.</strong></p><button className="replay" onClick={()=>{setBloomed(false);window.setTimeout(()=>setBloomed(true),100)}}>↻ 다시 피워보기</button></section>
 <ProductCarousel id="collection" title="동백마을 굿즈" eyebrow="A LITTLE VILLAGE, EVERY DAY" caption="02 / DONGBAEK VILLAGE GOODS" description="함께 걷는 길에도, 잠깐 쉬어가는 순간에도. 마을의 색을 곁에 두세요." products={[
  {image:"tote",name:"에코백",en:"CAMELLIA TOTE BAG",text:"가벼운 발걸음에 함께하는 마을의 색."},
  {image:"tumbler",name:"텀블러",en:"EVERYDAY TUMBLER",text:"잠깐의 쉼에도, 동백 한 송이."},
  {image:"keyring",name:"키링",en:"LITTLE BLOOM KEYRING",text:"가까이 두고 싶은 동백의 기억."},
 ]} onNotify={()=>setNotice(true)}/>
 <ProductCarousel id="collab" title="A20 Lite 콜라보 굿즈" eyebrow="DONGBAEK VILLAGE × A20 LITE" caption="03 / A20 LITE COLLABORATION" description="색연필로 그린 듯 다정한 동백. A20 Lite와 함께 펼쳐지는 또 다른 일상." products={[
  {image:"pouch-single",name:"파우치",en:"BLOOM POUCH",text:"작은 소지품과 함께 담아두는 동백의 색."},
  {image:"oil-single",name:"오일",en:"BLOOM OIL",text:"동백의 이야기를 담은 작은 한 병."},
  {image:"collab-keyring-single",name:"키링",en:"CAMELLIA ACRYLIC KEYRING",text:"꽃 한 송이처럼, 가방에 달아두는 설렘."},
  {image:"handcream-single",name:"핸드크림",en:"BLOOM HAND CREAM",text:"손끝 가까이에서 만나는 동백의 그림."},
  {image:"cup-single",name:"컵",en:"BLOOM CERAMIC CUP",text:"하루의 여유를 담는 따뜻한 동백 한 잔."},
 ]} onNotify={()=>setNotice(true)}/>
 <CardNews/>
 <section className="notify-section" id="notify"><Flower/><p className="eyebrow">LET YOUR EVERYDAY BLOOM</p><h2>곧 피어날 소식,<br/>가장 먼저 만나세요.</h2><p>동백마을 × A20 Lite의 새로운 만남.<br/>이메일로 콜라보 출시 소식을 받아보세요.</p><button className="email-notify-button" onClick={()=>setNotice(true)}><span aria-hidden="true">✉</span> 이메일 알림받기 <span>↗</span></button><p className="notify-note">이메일만 입력하면 신청할 수 있어요</p></section></main>
 <footer><a href="#" className="brand">bL<Flower/>OM</a><p>동백마을의 이야기를, 당신의 일상에.</p><span>동백마을 × A20 Lite</span><a href="/sns">동백마을 카드뉴스 7장 ↗</a><small>© 동백마을 × A20 Lite. Campaign concept.</small></footer>
 <dialog ref={dialog} onCancel={()=>setNotice(false)} onClick={e=>{if(e.target===e.currentTarget)setNotice(false)}} className="notice-dialog"><button className="close-dialog" onClick={()=>setNotice(false)} aria-label="닫기">×</button><Flower/><p className="eyebrow">COMING SOON</p><h2>곧 피어날 소식,<br/>이메일로 만나세요.</h2><p>동백마을 × A20 Lite의 출시 알림을 신청하세요.</p><NotificationForm/></dialog></>;
}
