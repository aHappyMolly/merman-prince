
// 📌 綁定點擊行為
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('[data-scroll-target]');
  cards.forEach(card => {
    // hover 特效
    card.addEventListener('mouseenter', () => {
      card.classList.add('glow-hover');
    });
    card.addEventListener('mouseleave', () => {
      card.classList.remove('glow-hover');
    });

    // 點擊行為
    card.addEventListener('click', () => {
      const targetId = card.dataset.scrollTarget;
      scrollToSection(targetId);
    });
  });
});


// 📌 自動滾動至目標 + 高亮效果
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });

    // 🔸高亮區塊特效
    section.classList.add('highlight-pulse');
    setTimeout(() => {
      section.classList.remove('highlight-pulse');
    }, 1500); // 1.5 秒後移除效果
  }
}

document.querySelectorAll('.connection-line').forEach(img => {
  console.log(img.src, img.naturalWidth, img.naturalHeight);
});



/* ================
   ▶ 使用者行為偵測
   ================ */
