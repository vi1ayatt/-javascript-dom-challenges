const colorBox = document.querySelector("#colorBox");

document.querySelectorAll("[data-color]").forEach((button) => {
  button.addEventListener("click", (event) => {
    const color = event.currentTarget.dataset.color;
    colorBox.style.backgroundColor = color.toLowerCase();
    colorBox.textContent = color;
  });
});
