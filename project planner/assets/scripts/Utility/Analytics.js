const intervalId = setInterval(() => {
  console.log("Sending Analytics data...");
}, 2000);

const stopBtn = document.querySelector("#stop-btn");
stopBtn.addEventListener("click", () => {
  clearInterval(intervalId);
});
