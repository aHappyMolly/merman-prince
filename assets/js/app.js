// app.js：主要頁面切換控制器 + 狀態紀錄模組

// 🌐 初始化狀態（預設從選擇頁開始）
let currentPage = 'select';
const pageGroups = ['100', '200', '300','500','600']; // Heart, Language, Structure

import { renderSelectionOverlay } from './routes.js';

// ✅ 暴露切換頁面的函式給其他檔案調用

export function showPage(target) {
  const groupMap = {
    heart: '100',
    lang: '200',
    struct: '300',
    reward: '500',
    select: '600'
  };

  const targetClass = `.z-group-${groupMap[target]}`;
  const targetGroup = document.querySelector(targetClass);
  const currentGroup = document.querySelector(`.z-group-${groupMap[currentPage]}`);

  if (currentGroup) {
    // 👉 加入淡出動畫（先移除 visible）
    currentGroup.classList.remove('visible');
    currentGroup.classList.add('hidden');

    // ❗使用 setTimeout 等待淡出完成後再切頁
    setTimeout(() => {
      if (currentGroup) {
        currentGroup.style.display = 'none';
      }

      // 👉 淡入目標頁面
      if (targetGroup) {
        targetGroup.style.display = 'block';

        // 加入動畫 class
        setTimeout(() => {
          targetGroup.classList.remove('hidden');
          targetGroup.classList.add('visible');
        }, 10);
      }

      // 更新狀態與觸發事件綁定
      currentPage = target;
      updateNavbar(target);
      bindNextTriggers();

    }, 400); // 過渡時間略短於 CSS 的 0.8s（避免中斷）
  }
}


function updateNavbar(target) {
  const displayNames = {
    heart: 'Origin Page',
    lang: 'Word Page',
    struct: 'Structure Page',
    reward: 'Reward',
    select: 'Selection'
  };
  const indicator = document.getElementById('pageIndicator');
  if (indicator) indicator.textContent = displayNames[target] || '---';
}

// ✅ DOM 載入後預設載入選擇頁
document.addEventListener('DOMContentLoaded', () => {
    showPage(currentPage);
    bindNextTriggers();

    // 初始化選擇層內容
    if (typeof renderSelectionOverlay === "function") {
      renderSelectionOverlay();
    }

    // 🔄 工具箱與等級資訊開關控制

    // 取得 DOM 元素
    const toolboxIcon = document.getElementById("toolbox-icon");
    const toolboxPanel = document.getElementById("toolbox-panel");
    const levelIcon = document.getElementById("level-icon");
    const levelPanel = document.getElementById("level-panel");

    // 點擊工具箱 icon → 切換工具箱面板
    toolboxIcon.addEventListener("click", () => {
      toolboxPanel.classList.toggle("hidden");
    });

    // 點擊使用者等級 icon → 切換等級面板
    levelIcon.addEventListener("click", () => {
      levelPanel.classList.toggle("hidden");
    });

});


  // 中結局影片播完後，才出現「繼續」按鈕
// function showNextButton() {
//   document.getElementById("Next-click-layer").style.display = "flex";
// }

function showNextButton() {
  setTimeout(() => {
    document.getElementById("Next-click-layer").classList.add("show");
  }, 1000); // 1000ms = 1 秒
}

  
  // 🎯 綁定各頁尾部「前往選擇頁」的觸發器
function bindNextTriggers() {
  const triggers = document.querySelectorAll('[data-trigger="open-select"]');

  triggers.forEach(el => {
    // ✅ 先移除舊的綁定（避免堆疊）
    el.removeEventListener('click', handleNextTrigger); 
    el.addEventListener('click', handleNextTrigger);
  });
}

// 🎯 單獨定義觸發處理器（避免匿名函式無法 remove）
function handleNextTrigger() {
  console.log("✅『繼續』按鈕被點擊了！");
  if (typeof renderSelectionOverlay === 'function') {
    showPage("select");
    renderSelectionOverlay();
    console.log("✅ 選擇頁『切換』了！");
  }
}




/* ================
   ▶ 使用者行為偵測
   ================ */

//不能用import，會無法跨 JS 模組匯入，因為不是 module 環境
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

// 不要 import，直接用全域 db [正確簡易測試版]
  // db.collection("你的集合名").add({
  //   sessionId: window.sessionId,
  //   timestamp: new Date(),
  //   event: "something"
  // });


//   const db = window.db;  // ✅ 正確方式取得 Firestore 實例

//   function recordUserSelection({
//     sessionId,
//     page,
//     timestamp,
//     choiceId,
//     choiceText,
//     fragmentEffect,
//     emotionalTag,
//     moduleInvolved,
//     visualPathId,
//     userPathProgress,
//     badgeUnlocked,
//   }) 

//   {
//     if (!db) {
//       console.error("Firestore 尚未初始化，請確認 firebase-init.js 正常載入。");
//       return;
//     }

//     db.collection("user_choices").add({
//       sessionId,
//       page,
//       timestamp,
//       choiceId,
//       choiceText,
//       fragmentEffect,
//       emotionalTag,
//       moduleInvolved,
//       visualPathId,
//       userPathProgress,
//       badgeUnlocked,
//     })
//     .then(() => console.log("✅ 使用者選擇已成功記錄"))
//     .catch((error) => console.error("❌ 記錄失敗", error));
//   }

  
// // ✅ 將此函式掛上全域，供其他 js 使用
// window.recordUserSelection = recordUserSelection;




//   // ❗舉例呼叫方式（整合到你的選擇事件邏輯中）
//   recordUserSelection({
//     sessionId: localStorage.getItem("sessionId"),
//     page: "main.html",
//     timestamp: new Date().toISOString(),
//     choiceId: "C3Q1-A",
//     choiceText: "I chose empathy over logic.",
//     fragmentEffect: "unlocked-mirror",
//     emotionalTag: "tender",
//     moduleInvolved: ["Narrative Loop", "Emotional Trigger"],
//     visualPathId: "Path-A2",
//     userPathProgress: "3/5",
//     badgeUnlocked: "Mirror Seeker",
//   });




