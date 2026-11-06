// Address source: https://m.visitjeju.net/kr/detail/view?contentsid=CNTS_000000000000976
const address = "제주특별자치도 서귀포시 남원읍 중산간동로 5830";
const destination = address;
const naverMap = `https://map.naver.com/p/search/${encodeURIComponent(destination)}`;
const googleMap = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;

export default function Directions() {
  return (
    <section id="directions" className="directions-section" aria-labelledby="directions-title">
      <div className="directions-copy">
        <p className="eyebrow">MEET US IN JEJU</p>
        <h2 id="directions-title">동백마을로 찾아오시는 길</h2>
        <p className="directions-place">신흥2리 동백마을</p>
        <address>{address}</address>
      </div>
      <div className="directions-links" aria-label="지도에서 찾아보기">
        <a className="directions-naver" href={naverMap} target="_blank" rel="noopener noreferrer" aria-label="네이버지도에서 동백마을 보기 (새 창)"><span className="map-letter" aria-hidden="true">N</span>네이버지도에서 보기 <span aria-hidden="true">↗</span></a>
        <a className="directions-google" href={googleMap} target="_blank" rel="noopener noreferrer" aria-label="구글지도로 동백마을 길찾기 (새 창)"><svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>구글지도 길찾기 <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
