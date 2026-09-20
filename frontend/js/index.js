const BACKEND_ROOT_URL = "/api/";

import { Todos } from "./class/Todos.js";

const todos = new Todos(BACKEND_ROOT_URL);

const list = document.querySelector("ul");
const input = document.querySelector("input");
const timeDisplay = document.getElementById("server-time");

input.disabled = true;

const renderTask = (task) => {
  const li = document.createElement("li");
  li.setAttribute(
    "class",
    "list-group-item d-flex justify-content-between align-items-center",
  );
  li.setAttribute("data-key", task.getId().toString());

  const span = document.createElement("span");
  span.innerText = task.getText();
  li.appendChild(span);

  renderLink(li, task.getId());
  list.append(li);
};

const renderLink = (li, id) => {
  const a = document.createElement("a");
  a.innerHTML =
    '<i class="bi bi-trash text-danger" style="cursor: pointer;"></i>';
  a.addEventListener("click", () => {
    todos
      .removeTask(id)
      .then((removed_id) => {
        const li_to_remove = document.querySelector(
          `[data-key='${removed_id}']`,
        );
        if (li_to_remove) {
          list.removeChild(li_to_remove);
        }
      })
      .catch((error) => {
        alert(error);
      });
  });
  li.appendChild(a);
};

const getTasks = () => {
  todos
    .getTasks()
    .then((tasks) => {
      tasks.forEach((task) => renderTask(task));
      input.disabled = false;
    })
    .catch((error) => {
      alert(error);
    });
};

const getTime = () => {
  if (timeDisplay) {
    fetch("/api/time")
      .then((res) => res.json())
      .then((data) => {
        timeDisplay.innerText = new Date(data.serverTime).toLocaleString(
          "fi-FI",
          {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          },
        );
      })
      .catch(() => {
        timeDisplay.innerText = "Unable to fetch time";
      });
  }
};

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const task = input.value.trim();
    if (task !== "") {
      todos
        .addTask(task)
        .then((task) => {
          renderTask(task);
          input.value = "";
          input.focus();
        })
        .catch((error) => {
          alert(error);
        });
    }
  }
});

getTime();
getTasks();
