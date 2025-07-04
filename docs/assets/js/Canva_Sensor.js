
  const canvas = document.getElementById("line-canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.src = "assets/img/main/03_結構頁/sec03/line.png";

  img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const isOpaque = pixel[3] > 20;

    canvas.classList.toggle("hovering", isOpaque);
  });

  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    if (pixel[3] > 20) {
      // 滑到不透明部分才觸發
      const target = document.getElementById("struct-section-04");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  });



  /* ================
   ▶ 使用者行為偵測
   ================ */

