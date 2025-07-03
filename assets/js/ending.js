function showOptions(nextStepId) {
//   document.getElementById('step-01').classList.add('hidden');
//   document.getElementById(nextStepId).classList.remove('hidden');

  const nextStep = document.getElementById(nextStepId);
  if (nextStep) {
    nextStep.classList.remove("hidden");
  }
}

function transitionStep(currentId, nextId) {
  const current = document.getElementById(currentId);
  const next = document.getElementById(nextId);
  current.classList.add('hidden');
  next.classList.remove('hidden');
}

function playAnimation04() {
  transitionStep('step-03', 'step-04');
  const video = document.getElementById('video04');
  video.currentTime = 0;
  video.play();
}


video04.onended = () => {
  const step4 = document.getElementById('step-04');
  const step5 = document.getElementById('step-05');

  // 加上 fade-out 效果
  step4.classList.add('fade-out');

  // 淡出完再淡入 step-05
  setTimeout(() => {
    step4.classList.add('hidden'); // 真正隱藏
    step4.classList.remove('fade-out'); // 清除 class 方便下次播放

    step5.classList.remove('hidden');
    step5.classList.add('fade-in');
  }, 1000); // 1 秒後進行切換
};



/* ================
   ▶ 使用者行為偵測
   ================ */
