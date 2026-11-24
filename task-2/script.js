const message = document.querySelector("#message");
const counter = document.querySelector("#counter");
const remaining = document.querySelector("#remaining");
const progress = document.querySelector("#progress");
const limit = message.maxLength;

function updateCounter() {
  const length = message.value.length;
  counter.textContent = length + " / " + limit;
  remaining.textContent = "Remaining: " + (limit - length);
  counter.classList.toggle("warning", length > 80 && length < limit);
  counter.classList.toggle("limit", length === limit);
  progress.value = length;
}

message.addEventListener("input", updateCounter);
document.querySelector("#clear").addEventListener("click", () => {
  message.value = "";
  updateCounter();
  message.focus();
});
updateCounter();
