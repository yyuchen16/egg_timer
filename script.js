let timer = null;
let remainingSeconds = 0;

const minutesInput = document.getElementById("minutes");
const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const dingSound = new Audio("ding.mp3");

function updateDisplay(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  display.textContent = `${m}:${s}`;
}

function startTimer() {
  if (timer) return;
  let mins = parseInt(minutesInput.value, 10);
  if (isNaN(mins) || mins < 1) mins = 1;
  remainingSeconds = mins * 60;
  updateDisplay(remainingSeconds);

  timer = setInterval(() => {
    remainingSeconds--;
    updateDisplay(remainingSeconds);
    if (remainingSeconds <= 0) {
      clearInterval(timer);
      timer = null;

      dingSound.pause();
      dingSound.currentTime = 0;

      dingSound
        .play()
        .then(() => {
          console.log("✅ 聲音播放成功");
          alert("時間到！雞蛋好了！");
        })
        .catch((err) => {
          console.error("播放失敗：", err);
          alert("時間到！雞蛋好了！（但聲音可能沒播）");
        });
    }
  }, 1000);
}

function stopTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);

minutesInput.addEventListener("change", () => {
  let mins = parseInt(minutesInput.value, 10);
  if (isNaN(mins) || mins < 1) mins = 1;
  updateDisplay(mins * 60);
});

// 預設顯示
updateDisplay(parseInt(minutesInput.value, 10) * 60);
