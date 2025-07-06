// reward.js

import { showPage } from './app.js';

// 🔹 儲存並更新使用者的選擇紀錄
// 傳入這輪選擇的 fragCode 與 combo，內部進行紀錄更新、分級判斷與提示
export function updateCollections(fragCode, comboPair) { // 儲存進 localStorage
    // 更新主動選擇過的 fragment（五款）
    let collected = JSON.parse(localStorage.getItem("collectedFragments")) || [];
    if (!collected.includes(fragCode)) {
      collected.push(fragCode);
      localStorage.setItem("collectedFragments", JSON.stringify(collected));
    }
  
    // 更新被動看過的 combo 組合（十組）
    let seenCombos = JSON.parse(localStorage.getItem("seenCombos")) || [];
    if (!seenCombos.includes(comboPair)) {
      seenCombos.push(comboPair);
      localStorage.setItem("seenCombos", JSON.stringify(seenCombos));
    }

  }


  
  // 🔹 計算 title 分級（F/A/B/C）
  function computeTitleLevel() {
    const seenCombos = JSON.parse(localStorage.getItem("seenCombos")) || [];
    const count = seenCombos.length;
    if (count >= 10) return "F";
    if (count >= 7) return "A";
    if (count >= 4) return "B";
    if (count >= 1) return "C";
    return "-";
  }
  
  // 🔹 計算 unlock 等級（S/P/N）
  function computeUnlockLevel() {
    const collected = new Set(JSON.parse(localStorage.getItem("collectedFragments")) || []);
    const seenCombos = JSON.parse(localStorage.getItem("seenCombos")) || [];
    if (seenCombos.length >= 10) return "S";
    if (collected.size >= 5) return "P";
    return "N";
  }
  
  // 🔹 顯示彈出提示
  function displayFragmentPopup(fragCode, comboPair, titleLevel, unlockLevel) {
    const container = document.createElement("div");
    container.className = "popup-frag";
    container.innerHTML = `
      <div class="popup-inner">
        <p>本輪蒐集：<strong>${fragCode}</strong> / 組合：<strong>${comboPair}</strong></p>
        <p>目前稱號：<strong>${titleLevel}</strong>　劇情狀態：<strong>${unlockLevel}</strong></p>
        <button onclick="this.parentElement.parentElement.remove()">關閉</button>
      </div>
    `;
    Object.assign(container.style, {
      position: 'fixed', top: '20px', right: '20px', background: '#fff', padding: '1em', border: '1px solid #999', zIndex: 9999
    });
    document.body.appendChild(container);
  }


// 🔹 計算進度百分比
function computeUnlockProgressPercent() {
  const collected = new Set(JSON.parse(localStorage.getItem("collectedFragments")) || []);
  const seenCombos = JSON.parse(localStorage.getItem("seenCombos")) || [];

  const maxCombo = 10;
  const maxFrag = 5;

  const comboProgress = Math.min(seenCombos.length / maxCombo, 1);
  const fragProgress = Math.min(collected.size / maxFrag, 1);

  const totalProgress = ((comboProgress + fragProgress) / 2) * 100;

  return Math.round(totalProgress); // 回傳整數百分比
}


// 🔹 讓稱號（A/B/C/F）對應研究機構名稱
const affiliationPools = {
  "A": ["ETH Zurich", "University of Geneva"],
  "B": ["St. Petersburg Academy of Sciences", "Humboldt University of Berlin"],
  "C": ["Swiss Academy of Sciences", "University of Basel"],
  "F": ["Technische Universität Braunschweig"]
};


// 🔹 儲存分配後的機構（只分配一次）
function getOrAssignAffiliation(level) {
  let key = `affiliation_${level}`;
  let stored = localStorage.getItem(key);

  if (stored) {
    return stored;
  }

  let options = affiliationPools[level];
  if (!options) return "None";

  // (目前暫時先)隨機抽一個
  let selected = options[Math.floor(Math.random() * options.length)];
  localStorage.setItem(key, selected);
  return selected;
}


// 🔹 顯示左上角稱號資訊（#level-panel）
function updateLevelPanel(titleLevel, unlockLevel) {
  const panel = document.getElementById("level-panel");
  const affiliation = getOrAssignAffiliation(titleLevel);
  if (panel) {
    const progressPercent = computeUnlockProgressPercent();
    panel.innerHTML = `
      <p><strong>🪐 Affiliation Updated:</strong> ${affiliation}</p>
      <p><strong>🎖 System Alignment:</strong> ${titleLevel}-Level Researcher</p>
      <p><strong>📊 Data Integration:</strong> ${progressPercent}%</p>
    `;
  }
}


// 🔹 顯示右下角碎片組合資訊（#toolbox-panel）
    // JSON.parse(...) 是把那段文字（通常是 ["H/Sa", "Sa/Wb"] 這種陣列字串）轉成真的陣列。
    // || [] 表示如果撈不到，就給它一個空陣列，避免後面 .includes(...) 爆掉
function updateToolboxPanel() {
  const panel = document.getElementById("toolbox-panel");
  const seenCombos = JSON.parse(localStorage.getItem("seenCombos")) || [];

  // 固定順序定義（你原本 comboMap 的順序）
  const orderedCombos = [
    "H_Sa", "H_Sb", "H_Wa", "H_Wb", 
    "Sa_Sb", "Sa_Wa", "Sa_Wb", 
    "Sb_Wa", "Sb_Wb", "Wa_Wb"
  ];


  // 確保 DOM 裡真的有 id="toolbox-panel" 這個元素，才進行更新
     // "combo-grid"：整個格子的包裝容器。
     // orderedCombos.map(...)：針對每個組合名稱產生一個格子 "combo-cell"
        // 如果 seenCombos.includes(name) 是 true，代表已蒐集 → 顯示這個組合文字
        // 如果是 false → 留空格子（讓你知道這格應該有但還沒出現）        
  if (panel) {
    panel.innerHTML = `
      <p><strong>🔍 Inventory</strong></p>
      <div class="combo-grid"> 
      ${orderedCombos.map(name => `  
          <div class="combo-cell">
            ${seenCombos.includes(name) ? name : ""}
          </div>
        `).join("")}
      </div>
    `;
  }
}

export { updateToolboxPanel };


  

  // 🔹 依 unlock 等級處理獎勵觸發
function checkRewards(unlockLevel, fragCode) {
  const hasShownReward = localStorage.getItem("hasShownReward");
  const hasShownEnding = localStorage.getItem("hasShownEnding");

  if (unlockLevel === "S" && hasShownEnding !== "true") {
    localStorage.setItem("hasShownEnding", "true");
    window.location.href = "ending.html";
    return "handled"; // ✅ S: 已跳轉 ending
  }


  if (unlockLevel === "P") {
    if (hasShownReward !== "true") {
      localStorage.setItem("hasShownReward", "true");
      document.querySelectorAll(".z-group").forEach(el => el.style.display = "none");
      const rewardPage = document.querySelector(".z-group-500");
      if (rewardPage) {
        rewardPage.style.display = "block";
        rewardPage.classList.remove('hidden');
        showPage("reward");
      }
      return "handled"; // ✅ P: 第一次跳獎勵頁
    } else {
      return "continue"; // ✅ P: 已經顯示過 → 應繼續跑主循環
    }
  }

  return "continue"; // ✅ N: 一律繼續主線流程
}
  


  // 🔹 對外暴露主函式，供 routes.js 在選擇後呼叫
  export function updateCollectionAndCheck(fragCode, comboPair) {
    updateCollections(fragCode, comboPair);

    const titleLevel = computeTitleLevel();
    const unlockLevel = computeUnlockLevel();

    const progressPercent = computeUnlockProgressPercent();
    const badge = titleLevel + "-Level Researcher";

    // ✅ 更新全域變數（確保每輪都更新）
    window.userLogData.userPathProgress = `${progressPercent}%`;
    window.userLogData.badgeUnlocked = badge;
    window.userLogData.currentStatus = unlockLevel;

    // window.userLogData.userPathProgress = computeUnlockProgressPercent();
    // window.userLogData.badgeUnlocked = computeTitleLevel() + "-Level Researcher";
    // window.userLogData.currentStatus = computeUnlockLevel()


    // displayFragmentPopup(fragCode, comboPair, titleLevel, unlockLevel); //測試確認用的而已，正式運作不用顯示(來不及搞ㄌ~
    updateLevelPanel(titleLevel, unlockLevel);
    updateToolboxPanel();

    const result = checkRewards(unlockLevel, fragCode);
    return result;  // ✅ 把狀態傳回去供 routes.js 檢查是否要繼續跳轉
  }
  



  /* ================
   ▶ 使用者行為偵測
   ================ */


// // window.userLogData.fragmentEffect = fragmentEffect; // e.g. "unlocked-mirror"
// window.userLogData.emotionalTag = emotionalTag;     // e.g. "tender"
// window.userLogData.moduleInvolved = involvedModules; // e.g. ["Narrative Loop"]
// window.userLogData.visualPathId = visualPathId;     // e.g. "Path-B3"
// window.userLogData.userPathProgress = progressLabel; // e.g. "4/5"
// window.userLogData.badgeUnlocked = badge;           // e.g. "Mirror Seeker"

// window.userLogData.emotionalTag = currentQuestionMeta.tag;
// window.userLogData.moduleInvolved = computedModules; //	模組邏輯涉入




// // reward.js 結算完成之後：
// const sessionId = window.sessionId;



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
//   }) {
//     if (!db) {
//       console.error("Firestore 尚未初始化，請確認 firebase-init.js 正常載入。");
//       return;
//     }
//   }

// recordUserSelection({
//   sessionId,
//   page: "main.html",
//   timestamp: new Date().toISOString(),
//   choiceId: questionObj.code,
//   choiceText: questionObj.text,
//   emotionalTag: questionObj.tag,
//   fragmentEffect: fragCode,

//   // moduleInvolved: computedModules,
//   // visualPathId: currentPathId,
//   // userPathProgress: currentProgressText,
//   // badgeUnlocked: computedBadge,
// });
