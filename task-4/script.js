const questions = document.querySelectorAll(".faq-question");

function setExpanded(question, expanded) {
  question.classList.toggle("active", expanded);
  question.setAttribute("aria-expanded", String(expanded));
  question.querySelector("span").textContent = expanded ? "−" : "+";
  question.nextElementSibling.setAttribute("aria-hidden", String(!expanded));
}

questions.forEach((question) => {
  question.addEventListener("click", (event) => {
    const clicked = event.currentTarget;
    const shouldOpen = !clicked.classList.contains("active");
    questions.forEach((item) => setExpanded(item, item === clicked && shouldOpen));
  });
});
