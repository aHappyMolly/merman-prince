
document.addEventListener('DOMContentLoaded', () => {



    /* =================
    ▶ Expand-card /line.js
     =================== */

  const cardPairs = document.querySelectorAll('.expand-card-complete');
  
  
  //一一綁定，完整支援每一組卡片獨立控制
  cardPairs.forEach(pair => {
    const expandCard = pair.querySelector('.expand-card-container');
    const expandLine = pair.querySelector('.expand-line-container');
    const expandPanel = pair.querySelector('.card-expand');
    const closeBtn = pair.querySelector('.close-expand');

  
    if (expandCard && expandPanel && closeBtn) {

      // 點擊卡片顯示展開
      expandCard.addEventListener('click', () => {
      expandPanel.classList.remove('hidden');
      });

      // 點擊關閉
      closeBtn.addEventListener('click', () => {
      expandPanel.classList.add('hidden');
      });
    }

    if (expandLine && expandPanel && closeBtn) {

      // 點擊卡片顯示展開
      expandLine.addEventListener('click', () => {
      expandPanel.classList.remove('hidden');
      });

      // 點擊關閉
      closeBtn.addEventListener('click', () => {
      expandPanel.classList.add('hidden');
      });
    }

  });


  
  /* ==============
      ▶ Hscroll.js
     =============== */

   // info設定
   
// 先隱藏所有 popup（這段也會在外部點擊時重複呼叫）
function hideAllPopups() {
  document.querySelectorAll('.info-popup').forEach(popup => {
    popup.classList.add('hidden');
  });
}

const infoIcons = document.querySelectorAll('.info-icon');

infoIcons.forEach(icon => {
  icon.addEventListener('click', (e) => {
    e.stopPropagation(); // 避免冒泡到 document

    hideAllPopups(); // 先關所有 popup

    const popupId = icon.getAttribute('data-popup-id');
    const popup = document.getElementById(popupId);

    if (popup) {
      popup.classList.remove('hidden');
    }
  });
});


// 點擊頁面其他地方 → 關掉所有 popup
document.addEventListener('click', () => {
  hideAllPopups();
});


});




  const mySwiper = new Swiper('.swiper', {
      direction: 'horizontal',
      loop: true,
      pagination: { el: '.swiper-pagination' },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });




/* ================
    ▶  一疊卡卡.js
   ================ */


document.querySelectorAll('.expandable-card').forEach(card => {
  const preview = card.querySelector('.card-preview');
  const expanded = card.querySelector('.card-expanded');
  const closeBtn = expanded.querySelector('.close-button');

  // 點擊卡片顯示展開
  preview.addEventListener('click', () => {
    expanded.classList.remove('hidden');
    const swiperEl = expanded.querySelector('.swiper');

    if (!swiperEl.classList.contains('swiper-initialized')) {
      new Swiper(swiperEl, {
        pagination: { el: expanded.querySelector('.swiper-pagination'), clickable: true },
      });
    }
  });

  // 點擊關閉
  closeBtn.addEventListener('click', () => {
    expanded.classList.add('hidden');
  });
});





/* ================
   ▶ 使用者行為偵測
   ================ */



    







