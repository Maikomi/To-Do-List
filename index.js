// On form submit add task
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  addTask();
});

const loadTasks = () => {
  // check if localStorage has any tasks
  if (localStorage.getItem("tasks") == null) return;

  // Get the tasks from localStorage and convert it to an array
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

  // Loop through the tasks and add them to the list
  tasks.forEach((task) => {
    const list = document.querySelector("ul");
    const li = document.createElement("li");
    li.innerHTML = `<div id=${task.id}><section class="checkbox"></section>
    <h3 class="task ${task.completed ? "completed" : ""}" >${task.task}</h3>
    <p>${task.des}</p>
    <section class= "kill" onclick="removeTask(this)"> </section></div>`;
    list.insertBefore(li, list.children[0]);
  });
};

const addTask = () => {
  const task = document.getElementById("name");
  const des = document.getElementById("des");
  const list = document.querySelector("ul");
  const local = localStorage.getItem("tasks");
  let inner = [];
  if (local) {
    inner = Array.from(JSON.parse(localStorage.getItem("tasks")));
  }
  let obj = inner.find((o) => o.task === task.value);

  // return if task is empty
  if (task.value === "") {
    alert("Please add some task!");
    return;
  }

  // check is task already exist
  if (obj) {
    window.alert("Task already exist!");
    return;
  }

  let taskx = {
    id: task.value,
    task: task.value,
    des: des.value,
    completed: false,
  };
  // add task to local storage
  localStorage.setItem(
    "tasks",
    JSON.stringify([
      ...JSON.parse(localStorage.getItem("tasks") || "[]"),
      taskx,
    ])
  );

  //add innerHTML
  const li = document.createElement("li");
  li.innerHTML = `<div id="${taskx.id}"><section class="checkbox"></section>
  <h3 class="task ${taskx.completed ? "completed" : ""}" >${taskx.task}</h3>
    <p>${taskx.des}</p>
    <section class= "kill" onclick="removeTask(this)"></section></div>`;
  list.insertBefore(li, list.children[0]);
  // clear input
  task.value = "";
  des.value = "";
};

const taskComplete = (event) => {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach((task) => {
    if (task.task === event.nextElementSibling.value) {
      task.completed = !task.completed;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.nextElementSibling.classList.toggle("completed");
};

const removeTask = (event) => {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach((task) => {
    if (task.task === event.parentNode.children[1].value) {
      // delete task
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.parentElement.remove();
};

const clear_me = () => {
  localStorage.clear();
  location.reload();
};

const btn = document.getElementById("die");
btn.addEventListener("click", clear_me);

window.onload = loadTasks;
