// FadeIO_ZoomIn.js



const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const type = entry.target.dataset.animation;

      if (type === "heart-lines") startHeartLineAnimation(entry.target);
      if (type === "phrase-series") startPhraseAnimation(entry.target);
      if (type === "lang-lines") startLangLineAnimation(entry.target);
      if (type === "phrase-mix") startMixAnimation(entry.target);

      // observer.unobserve(entry.target); // 只需一次觸發,要重播就刪掉這行
    }
  });
}, {
  threshold: 0.5  // 一半進畫面再觸發
});

// 監聽所有需動畫的區塊
document.querySelectorAll('.animate-on-visible').forEach(el => observer.observe(el));
 


  
  /* ==================================
    ▶ Line_ImgZoom 區 ( Heart 開場動畫 )
    ==================================== */

  function startHeartLineAnimation(container) {
    const l1 = container.querySelector('#line1');
    const l2 = container.querySelector('#line2');
    const l31 = container.querySelector('#line3-1');
    const l32 = container.querySelector('#line3-2');
    const l33 = container.querySelector('#line3-3');
    const bg = container.querySelector('.zoom-layer');
    const icon = container.querySelector('.icon-layer');


    // 秒數是接續ㄉ喔 //

    // Step 1: show line 1
    setTimeout(() => l1.classList.add('fade-in'), 1500);

    // Step 2: fade out line 1 + zoom bg to 120%
    setTimeout(() => {
      l1.classList.add('fade-out');
      bg.classList.add('zoom-in-01');
    }, 3000);

    // Step 3: show line 2
    setTimeout(() => l2.classList.add('fade-in'), 4500);

    // Step 4: fade out line 2 + zoom bg to 150%
    setTimeout(() => {
      l2.classList.add('fade-out');
      bg.classList.add('zoom-in-02');
      bg.classList.add('fade-out');
    }, 6500);

    // Step 5: show line 3（繼續加即可）
    setTimeout(() => l31.classList.add('fade-in'), 9000);
    setTimeout(() => l32.classList.add('fade-in'), 11000);
    setTimeout(() => l33.classList.add('fade-in'), 13000);
    setTimeout(() => icon.classList.add('fade-in'), 15000);
  }




    /* =======================
       ▶ Phrase區 ( 各區通用 )
       ======================== */


  function startPhraseAnimation(container) {
    const p1 = container.querySelector('#phrase1');
    const p2 = container.querySelector('#phrase2');
    const p3 = container.querySelector('#phrase3');
    const p4 = container.querySelector('#phrase4');
    const img = container.querySelector('#image01');


    // 秒數是接續ㄉ喔 //

    // Scence 1: phrase1 fade-in & out
    setTimeout(() => p1.classList.add('fade-in'), 500);
    // setTimeout(() => p1.classList.add('fade-out'), 3000);

    // Scence 2
    setTimeout(() => p2.classList.add('fade-in'), 3000);
    // setTimeout(() => p2.classList.add('fade-out'), 6000);

    // Scence 3（繼續加即可）
    setTimeout(() => p3.classList.add('fade-in'), 6000);

  }


    /* ================================
       ▶ Phrase + 背景大圖 ( 各區通用 )
       ================================ */


  function startMixAnimation(container) {
    const p1 = container.querySelector('#phrase1');
    const p2 = container.querySelector('#phrase2');
    const p3 = container.querySelector('#phrase3');
    const p4 = container.querySelector('#phrase4');
    const img1 = container.querySelector('#image01');


    // 秒數是接續ㄉ喔 //

    // Scence 1: phrase1 fade-in & out
    setTimeout(() => p1.classList.add('fade-in'), 500);
    // setTimeout(() => p1.classList.add('fade-out'), 3000);

    // Scence 2
    setTimeout(() => img1.classList.add('fade-in'), 2000);
    // setTimeout(() => img1.classList.add('fade-out'), 6000);

    // Scence 3（繼續加即可）


  }



// 滑入畫面才顯示 //

const fadeIns = document.querySelectorAll('.fade-in-simple');

const observer02 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // observer.unobserve(entry.target); // 若只觸發一次可取消註解
    }
  });
}, { threshold: 0.4 });

fadeIns.forEach(el => observer02.observe(el));


/* ================
   ▶ 使用者行為偵測
   ================ */
