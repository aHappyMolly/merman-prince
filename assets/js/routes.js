// routes.js：問句組合邏輯 + 隨機五選二畫面生成

import { updateCollectionAndCheck, updateToolboxPanel } from "./reward.js";

import { showPage } from "./app.js";


// 🌟 問句庫（可擴充）
const questionPool = [
  { code: "Q01",
    text: "What’s the matter?",
    tag: "emotion"
  },
    { code: "Q02",
    text: "Where are you？",
    tag: "emotion"
  },
    { code: "Q03",
    text: "What are you looking for ？",
    tag: "emotion"
  },
    { code: "Q04",
    text: "What’s in your mind ？",
    tag: "emotion"
  },
    { code: "Q05",
    text: "What do you seek ？",
    tag: "emotion"
  },
    { code: "Q06",
    text: "Who are you ？",
    tag: "emotion"
  },
    { code: "Q07",
    text: "How’s it work ？",
    tag: "emotion"
  },
    { code: "Q08",
    text: "Which is the one ？",
    tag: "emotion"
  },
    { code: "Q09",
    text: "Where am I ？",
    tag: "emotion"
  },
    { code: "Q10",
    text: "Who am I ？",
    tag: "emotion"
  },
];


// 🌌 五選二的碎片池（代碼、名稱）
const fragmentPool = [
  { code: "Wa", label: "Mirror" },
  { code: "Wb", label: "Shadow" },
  { code: "Sa", label: "Born" },
  { code: "Sb", label: "Net" },
  { code: "H",  label: "Heart" }
];

// 🔑 十組對照組合（順序無關），轉換"內部邏輯代碼」成「對使用者友善的顯示文字」
const comboMap = {
    "H_Sa": "H/Sa",
    "H_Sb": "H/Sb",
    "H_Wa": "H/Wa",
    "H_Wb": "H/Wb",
    "Sa_Sb": "Sa/Sb",
    "Sa_Wa": "Sa/Wa",
    "Sa_Wb": "Sa/Wb",
    "Sb_Wa": "Sb/Wa",
    "Sb_Wb": "Sb/Wb",
    "Wa_Wb": "Wa/Wb"
  };
  
  let collectedFragments = [];     // 使用者主動選擇的（五款）
  let seenCombos = [];             // 使用者看過的組合（十組）



// 🧠 隨機選一句問句
function getRandomQuestion() {
    const index = Math.floor(Math.random() * questionPool.length);
    return questionPool[index];
  }

// 🔀 隨機抽兩個不同選項（五選二）
function getRandomTwoFragments() {
  const shuffled = [...fragmentPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2);
}


// 📦 建立選擇畫面 DOM（插入畫面用）
export function renderSelectionOverlay() {
  const container = document.getElementById('selectContent');
  if (!container) return;

  // 清空內容
  container.innerHTML = '';

  const questionObj = getRandomQuestion();  // 拿到物件 (包含code、text、tag)
  const choices = getRandomTwoFragments();

  const questionEl = document.createElement('div');
  questionEl.className = 'selection-question';
  questionEl.textContent = questionObj.text;  // 只顯示文字
  container.appendChild(questionEl);



  const choiceContainer = document.createElement('div');
  choiceContainer.className = 'selection-choices';

  choices.forEach(frag => {
    const btn = document.createElement('button');
    btn.className = 'choice';
    btn.dataset.type = frag.code;

    // 加入標籤作為按鈕內容
    // btn.textContent = frag.label;
    // choiceContainer.appendChild(btn);

    // 加入圖片作為按鈕內容
    const img = document.createElement('img');
    img.src = `assets/img/main/04_選擇頁/${frag.code}.png`;

    img.alt = frag.label;
    img.className = 'choice-image';

    btn.appendChild(img);
    choiceContainer.appendChild(btn);

    // 在 renderSelectionOverlay 時設定問題
    // 使用者行為偵測記錄用（例如後面 upload）→ 存入 window
    window.currentQuestionMeta = {
    code: questionObj.code,
    tag: questionObj.tag };

  });

  container.appendChild(choiceContainer);
  container.classList.remove('hidden');

  bindChoiceEvents(choices);
}

// 🌐 根據 fragCode 導向對應頁面
function navigateToPage(fragCode) {
  if (fragCode === "H") {
    showPage("heart");
  } else if (fragCode === "Wa" || fragCode === "Wb") {
    showPage("lang");
  } else if (fragCode === "Sa" || fragCode === "Sb") {
    showPage("struct");
  }
}

// 🔁 綁定選項點擊事件 → 收錄(主動蒐集的)碎片 & 導向對應頁面
function bindChoiceEvents(currentChoices) {
  const choiceBtns = document.querySelectorAll('.choice');

  // 偵測選項按鈕點擊
  choiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const fragCode = btn.dataset.type; // e.g., "La", "Sb"
      
      const frag = currentChoices.find(c => c.code === fragCode);
      const [L, R] = currentChoices.map(c => c.code).sort();
      const comboOpt = `${L}_${R}`;
      // window.userLogData.questionCode = questionObj.code;
      // window.userLogData.questionText = questionObj.text;
      // window.userLogData.questionCode = window.currentQuestionMeta.code;
      // window.userLogData.questionText = window.currentQuestionMeta.text;
      window.userLogData.choiceId = "L"; // 或 R，看點哪個
      window.userLogData.choiceText = frag.label; // from fragmentPool
      window.userLogData.fragmentEffect = frag.code;
      window.userLogData.visualPathId = comboOpt;

      // // 再進 reward.js 做處理
      // const result = updateCollectionAndCheck(fragCode, comboKey);

      // [ 送出 ] 使用者行為偵測
      window.recordUserSelection({
        sessionId: localStorage.getItem("sessionId"),
        page: "main.html",
        timestamp: new Date().toISOString(),
        ...window.userLogData  // 👈 一次打包所有欄位
      });



      if (!collectedFragments.includes(fragCode)) {
        collectedFragments.push(fragCode);
        console.log('🧩 已收集：', collectedFragments);
      }

      // 透過 comboMap[comboKey] 對應出展示用的名稱（如 H/Sa、Sa/Lb）
      const [a, b] = currentChoices.map(c => c.code).sort();
      const comboKey = `${a}_${b}`;
      const displayCombo = comboMap[comboKey];

      if (displayCombo && !seenCombos.includes(displayCombo)) {
        seenCombos.push(displayCombo);
        console.log('📘 已蒐集：', seenCombos);
      }

      
      
// console.log("📦 更新工具箱 UI...");
// updateToolboxPanel();



      document.getElementById('selectOverlay').classList.add('hidden');

      //讓 reward.js 的主函式 updateCollectionAndCheck() 回傳目前的 unlock 狀態
      // 頁面切換交給 reward.js 邏輯協作處理
      const result = updateCollectionAndCheck(fragCode, comboKey);

      // ✅ 只有沒達成獎勵時才切頁,有獎勵就讓 reward.js 負責(獎勵完再)跳轉
      if (result === "continue") {
        navigateToPage(fragCode); // ✅ 若不是要跳獎勵 → 直接切到該頁
      }

    });
  });
}


// 🛠 Debug Panel (可移除)
window.debugState = () => {
    console.log('📦目前已收集碎片 (五款)：', collectedFragments);
    console.log('📦目前已看過組合 (十組)：', seenCombos);
};



/* ================
  ▶ 使用者行為偵測
  ================ */

// window.userLogData.questionCode = questionCode;  // e.g. "Q04"
// window.userLogData.questionText = questionText;  // 實際問句內容
// window.userLogData.choiceId = selectedChoiceId;  // e.g. "A"
// window.userLogData.choiceText = selectedChoiceText; // 實際選項內容








function debugUserLog() {
  console.table(window.userLogData);
}


  // //使用 window.db 變數存取   
  // const db = window.db;  // ✅ 正確方式取得 Firestore 實例



  //   db.collection("user_choices").add({
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
  //   .then(() => console.log("✅ 使用者選擇已成功記錄"))
  //   .catch((error) => console.error("❌ 記錄失敗", error));



 