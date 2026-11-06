import { subscribe } from "../../notifications/actions";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ error: "홈페이지에서 신청해 주세요." }, { status: 403 });
  }
  try {
    const result = await subscribe({}, await request.formData());
    return Response.json(result, { status: result.success ? 200 : 400 });
  } catch {
    return Response.json({ error: "신청 내용을 확인해 주세요." }, { status: 400 });
  }
}
