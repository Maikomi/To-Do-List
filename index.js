// On form submit add task
document.querySelector("form").addEventListener("submit", (e) => {addTask();});

const loadTasks = () => {
  // check if localStorage has any tasks
  if (localStorage.getItem("tasks") == null) return;

  // Get the tasks from localStorage and convert it to an array
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

  // Loop through the tasks and add them to the list
  tasks.forEach((task) => {
    const list = document.querySelector("ul");
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? "checked" : ""}>
          <h3 class="task ${task.completed ? "completed" : ""}" >${task.task}</h3><p>${task.des}</p>
          <p class="fa fa-trash" onclick="removeTask(this)">x</p>`;
    list.insertBefore(li, list.children[0]);
  });
}    

let inner = Array.from(JSON.parse(localStorage.getItem("tasks")));
console.log(inner);
let obj = inner.find(o => o.task === '${task}');
console.log(obj);

function addTask() {
  const task = document.getElementById("name");
  const des = document.getElementById("des");
  const list = document.querySelector("ul");
  let inner = Array.from(JSON.parse(localStorage.getItem("tasks")));
  let obj = inner.find(o => o.task === task.value);

  // return if task is empty
  if (task.value === "") {
    alert("Please add some task!");
    return;
  }

  // check is task already exist
  if (obj != undefined) {
    window.alert("Task already exist!");
    return;
  }

  // add task to local storage
  localStorage.setItem(
    "tasks",
    JSON.stringify([
      ...JSON.parse(localStorage.getItem("tasks") || "[]"),
      { task: task.value, des: des.value, completed: false },
    ])
  );

  // create list item, add innerHTML and append to ul
  const li = document.createElement("li");
  li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check">
      <h3 class="task ${task.completed ? "completed" : ""}">${task.value}</h3>
      <p>${des.value}</p>
      <p class="fa fa-trash" onclick="removeTask(this)">x</p>`;
  list.insertBefore(li, list.children[0]);
  // clear input
  task.value = "";
  des.value = "";
}

function taskComplete(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach((task) => {
    if (task.task === event.nextElementSibling.value) {
      task.completed = !task.completed;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.nextElementSibling.classList.toggle("completed");
}

function removeTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach((task) => {
    if (task.task === event.parentNode.children[1].value) {
      // delete task
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.parentElement.remove();
}

// store current task to track changes
var currentTask = null;

// get current task
function getCurrentTask(event) {
  currentTask = event.value;
}

document.getElementById("die").onclick = clear_me;

function clear_me() {
  localStorage.clear();
  location.reload();
}

const btn = document.getElementById("die");
btn.addEventListener("click", clear_me);

window.onload = loadTasks;
