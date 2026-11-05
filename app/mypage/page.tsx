import {Suspense} from "react";
import {redirect} from "next/navigation";
import {createClient} from "../../utils/supabase/server";
import ProfileForm from "./profile-form";
import "../auth/auth.css";
export const metadata={title:"마이페이지 | bLOOM"};
async function Profile(){
 const supabase=await createClient();
 const {data:{user},error}=await supabase.auth.getUser();
 if(error||!user)redirect("/login");
 const {data:profile,error:profileError}=await supabase.from("profiles").select("nickname").eq("id",user.id).single();
 return <ProfileForm email={user.email??""} nickname={profile?.nickname??""} profileError={Boolean(profileError)}/>;
}
export default function MyPage(){return <main className="auth-page"><Suspense fallback={<p role="status">로그인 상태를 확인하고 있어요…</p>}><Profile/></Suspense></main>}

