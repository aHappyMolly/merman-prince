  let showingZh = true;
  function toggleLang() {
    const wrapper = document.getElementById("tableWrapper");
    const btn = document.querySelector(".toggle-btn");
    showingZh = !showingZh;
    wrapper.className = showingZh ? "show-zh" : "show-en";
    btn.textContent = showingZh ? "切換為英文" : "Switch to Chinese";
  }


  /* ================
   ▶ 使用者行為偵測
   ================ */

// import { sessionId } from "./session.js";
// import { db } from "./firebase-init.js";
// import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// async function recordUserAction(action, detail) {
//   await addDoc(collection(db, "userActions"), {
//     sessionId: sessionId,
//     action: action,
//     detail: detail,
//     timestamp: Date.now(),
//     page: window.location.pathname
//   });
// }

// 不要 import，直接用全域 db
db.collection("你的集合名").add({
  sessionId: window.sessionId,
  timestamp: new Date(),
  event: "something"
});
