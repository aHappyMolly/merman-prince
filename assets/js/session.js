// session.js
let sessionId = localStorage.getItem("sessionId");

if (!sessionId) {
  sessionId = crypto.randomUUID();  // 產生唯一 ID
  localStorage.setItem("sessionId", sessionId);
}

// export { sessionId };

// 讓其他 JS 可以用 window.sessionId 取得
window.sessionId = sessionId;