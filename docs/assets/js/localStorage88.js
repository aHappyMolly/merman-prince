

function resetGame() {
  localStorage.clear(); // ⛔ 清除所有 localStorage 資料
  alert("所有進度已清除！");

  window.location.href = 'index.html'; //導回入口頁
}