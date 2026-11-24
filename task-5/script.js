const form = document.querySelector("#taskForm");
const input = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const totalTasks = document.querySelector("#totalTasks");
const completedTasks = document.querySelector("#completedTasks");
const filterButtons = document.querySelectorAll("[data-filter]");
const storageKey = "dom-challenges-task-5";

let tasks = [];
let nextId = 1;
let filter = "all";

try {
  const saved = JSON.parse(localStorage.getItem(storageKey));
  if (Array.isArray(saved)) {
    tasks = saved;
    nextId = tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;
  }
} catch {
  // Keep the task list usable when storage is unavailable.
}

function saveTasks() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  } catch {
    // The current list still works for this page session.
  }
}

function renderTasks() {
  const completed = tasks.filter((task) => task.completed);
  const visible = tasks.filter((task) =>
    filter === "all" || task.completed === (filter === "completed")
  );

  taskList.replaceChildren();
  visible.forEach((task) => {
    const item = document.createElement("li");
    item.dataset.id = task.id;
    item.classList.toggle("completed", task.completed);

    const label = document.createElement("span");
    label.className = "task-text";
    label.textContent = task.text;

    const complete = document.createElement("button");
    complete.type = "button";
    complete.dataset.action = "complete";
    complete.textContent = task.completed ? "Undo" : "Complete";

    const remove = document.createElement("button");
    remove.type = "button";
    remove.dataset.action = "delete";
    remove.textContent = "Delete";

    item.append(label, complete, remove);
    taskList.append(item);
  });

  totalTasks.textContent = "Total: " + tasks.length;
  completedTasks.textContent = "Completed: " + completed.length;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  tasks.push({ id: nextId++, text, completed: false });
  form.reset();
  input.focus();
  saveTasks();
  renderTasks();
});

taskList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const item = button.closest("li");
  const id = Number(item.dataset.id);

  if (button.dataset.action === "complete") {
    const task = tasks.find((entry) => entry.id === id);
    task.completed = !task.completed;
  } else {
    tasks = tasks.filter((task) => task.id !== id);
    item.remove();
  }

  saveTasks();
  renderTasks();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    filter = event.currentTarget.dataset.filter;
    filterButtons.forEach((option) => {
      option.setAttribute("aria-pressed", String(option.dataset.filter === filter));
    });
    renderTasks();
  });
});

renderTasks();
