/* ===============
  ▶ 輕量通用紀錄器
  ================ */

function logUserEvent(eventName, extraData = {}) {
  if (!window.db || !window.sessionId) return;

  window.db.collection("user_logs").add({
    sessionId: window.sessionId,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    page: window.location.pathname,
    event: eventName,
    ...extraData
  });
}




/* ===============
  ▶ 重資料紀錄器
  ================ */

// ✅ 確保 Firebase 實例已透過 window 傳進來
const db = window.db;  // Firestore 實例從全域拿

function recordUserSelection({
  sessionId,         // 使用者瀏覽器裝置的唯一識別
  page,              // 所在頁面
  timestamp,         // 紀錄事件的時間
  questionCode,      // 問句代碼（不是文字本身）
  questionText,      // 問句原文
  choiceId,          // 使用者選到的選項代碼 (左或右邊選項)
  choiceText,        // 使用者看到的選項文字
  fragmentEffect,    // 該選項所觸發的碎片代號
  emotionalTag,      // 此次選擇所標註的情緒意涵
  moduleInvolved,    // 關聯到的語言模組
  visualPathId,      // 使用者此輪切入的「視覺路徑組合編號」
  userPathProgress,  // 使用者目前選擇進度（e.g., 第幾組/共幾組）
  badgeUnlocked,     // 此次是否獲得新稱號（若有）
  currentStatus,     // 使用者目前整體的敘事狀態代碼
  earnedReward,      // 有觸發的獎勵動畫或徽章等
}) {
  if (!db) {
    console.error("❌ Firestore 尚未初始化，請確認 firebase-init.js 正常載入。");
    return;
  }

  db.collection("user_choices").add({
    sessionId,
    page,
    timestamp,
    questionCode,
    questionText,
    choiceId,
    choiceText,
    fragmentEffect,
    emotionalTag,
    moduleInvolved,
    visualPathId,
    userPathProgress,
    badgeUnlocked,
    currentStatus,
    earnedReward,
  })
  .then(() => console.log("✅ 使用者選擇已成功記錄"))
  .catch((error) => console.error("❌ 記錄失敗", error));
}

// ✅ 將此函式掛上全域，供其他 js 使用
window.recordUserSelection = recordUserSelection;
