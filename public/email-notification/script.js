const form = document.querySelector("#notification-form");
const message = document.querySelector("#message");
const button = form.querySelector("button");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!form.reportValidity() || button.disabled) return;
  const data = new FormData(form);
  button.disabled = true;
  button.textContent = "신청하는 중…";
  message.textContent = "";
  message.className = "";
  try {
    if (location.protocol === "file:") throw new Error("홈페이지 서버에서 이 페이지를 열어 신청해 주세요.");
    const response = await fetch(form.action, { method: "POST", body: data });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.error || "신청하지 못했습니다. 다시 시도해 주세요.");
    form.hidden = true;
    message.textContent = "알림 신청을 받았어요. 출시 소식을 받을 이메일이 등록됐어요.";
  } catch (error) {
    message.className = "error";
    message.textContent = error instanceof Error ? error.message : "연결을 확인하고 다시 시도해 주세요.";
  } finally {
    button.disabled = false;
    button.textContent = "이메일로 출시 알림받기 →";
  }
});
