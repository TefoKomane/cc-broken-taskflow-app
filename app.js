let tasks = [];
let currentFilter = 'all';
let nextId = 1;

const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const statsEl = document.getElementById('stats');
const filterBtns = document.querySelectorAll('.filters button');

//Tefo komane: add "save" in browser local storage and load tasks on page refresh//
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    nextId = Math.max(...tasks.map(t => t.id), 0) + 1;
  }
}

loadTasks();

addBtn.addEventListener('click', function () {
  const text = taskInput.value.trim();
  if (text === '') return;
  addTask(text);
  taskInput.value = '';
});

taskInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const text = taskInput.value.trim();
    if (text === '') return;
    addTask(text);
    taskInput.value = '';
  }
});


function addTask(text) {
  const task = {
    id: nextId++,
    text: text,
    completed: false,
  };

  tasks.push(task);
  saveTasks();
  renderTasks();
}


function toggleTask(id) {
  // Loop through all tasks and find the one with the matching id
  tasks = tasks.map(function (task) {

    // If the current task matches the clicked checkbox task
    if (task.id === id) {
      // Toggle the completed state (true → false, false → true)
      return { ...task, completed: !task.completed };
    }

    // Return unchanged task if it doesn't match
    return task;
  });

  // Re-render the UI so checkbox state updates visually
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });
  renderTasks();
}


function getFilteredTasks() {
  if (currentFilter === 'active') {
    return tasks.filter(function (task) { return task.completed === false; });
  }
  if (currentFilter === 'completed') {
    return tasks.filter(function (task) { return task.completed === true; });
  }
  return tasks;
}
 

function renderTasks() {
  const filtered = getFilteredTasks();

  if (filtered.length === 0) {
    taskList.innerHTML = '<li class="empty">No tasks here.</li>';
    updateStats();
    return;
  }

  taskList.innerHTML = '';

  filtered.forEach(function (task) {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' completed' : '');
    li.dataset.id = task.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', function () {
      toggleTask(task.id);
    });

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '×';
    deleteBtn.addEventListener('click', function () {
  deleteTask(task.id);  //Qhawekazi fixed the delete button not working by passing the correct task id to the deleteTask function
});
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  updateStats();
}


function updateStats() {
  const activeCount = tasks.filter(function (t) { return !t.completed; }).length;
  statsEl.textContent = activeCount + ' task' + (activeCount !== 1 ? 's' : '') + ' remaining';
}


filterBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    currentFilter = btn.dataset.filter;
    filterBtns.forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    renderTasks();
  });
});


renderTasks();
