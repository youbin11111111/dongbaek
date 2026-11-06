import CardNews from "../card-news";
import Link from "next/link";

export const metadata = { title: "동백마을 카드뉴스 | bLOOM" };

export default function SocialCards() {
  return <main><div className="sns-page"><Link className="sns-back" href="/">← 콜라보 웹사이트로</Link></div><CardNews /></main>;
}
