# 🐞 Bug Report — Week 6 Broken Todo App

## Project
JavaScript Todo App — DOM Manipulation & Events

---

# 🧩 Bug 1 — Checkbox Not Updating Task Completion

## Description
The checkbox for each task was not updating the task completion state when clicked. Users could interact with the checkbox, but the task would not toggle between completed and active states.

---

## File
`script.js`

---

## Line
~55–65 (`toggleTask` function)

---

## Cause
The `toggleTask()` function reused the variable name `id` inside the `.map()` callback function. This caused variable shadowing and an incorrect comparison:

```js
id.id === id
```

As a result, no matching task was found and the `completed` state never changed.

---

## Original

```js
function toggleTask(id) {
  tasks = tasks.map(function (id) {
    if (id.id === id) {
      return { ...id, completed: !id.completed };
    }
    return id;
  });

  renderTasks();
}
```

---

## Fixed

```js
function toggleTask(id) {
  tasks = tasks.map(function (task) {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  renderTasks();
}
```

---

## Result
- Checkbox now correctly toggles task completion state
- Completed tasks update visually in the UI
- Clicking again restores task to active state

---

# 🧩 Bug 2 — Delete Button Not Removing Correct Task

## Description
The delete button failed to remove the selected task correctly when clicked.

---

## File
`script.js`

---

## Line
~125–130 (delete button event listener)

---

## Cause
The code attempted to access `event.target.id`, but the delete button element did not contain an `id` attribute.

---

## Original

```js
deleteBtn.addEventListener('click', function (event) {
  deleteTask(event.target.id);
});
```

---

## Fixed

```js
deleteBtn.addEventListener('click', function () {
  deleteTask(task.id);
});
```

---

## Result
- Delete button now removes the correct task
- Task list updates immediately after deletion
- No undefined ID values are passed

---

# 🧩 Bug 3 — Active Filter Showing Incorrect Tasks

## Description
The “Active” filter displayed completed tasks instead of incomplete tasks.

---

## File
`script.js`

---

## Line
~80–90 (`getFilteredTasks` function)

---

## Cause
The active filter condition incorrectly checked for:

```js
task.completed === true
```

instead of checking for incomplete tasks.

---

## Original

```js
function getFilteredTasks() {
  if (currentFilter === 'active') {
    return tasks.filter(function (task) { 
      return task.completed === true; 
    });
  }

  if (currentFilter === 'completed') {
    return tasks.filter(function (task) { 
      return task.completed === true; 
    });
  }

  return tasks;
}
```

---

## Fixed

```js
function getFilteredTasks() {
  if (currentFilter === 'active') {
    return tasks.filter(function (task) { 
      return task.completed === false; 
    });
  }

  if (currentFilter === 'completed') {
    return tasks.filter(function (task) { 
      return task.completed === true; 
    });
  }

  return tasks;
}
```

---

## Result
- Active filter now correctly displays incomplete tasks
- Completed filter still works correctly
- Filtering behavior now matches expected functionality

---

# 🧩 Bug 4 — Add Button Triggering on Hover

## Description
Tasks were being added when hovering over the add button instead of clicking it.

---

## File
`script.js`

---

## Line
~10–20

---

## Cause
The wrong event type (`mouseover`) was used instead of `click`.

---

## Original

```js
addBtn.addEventListener('mouseover', function () {
  const text = taskInput.value.trim();
  if (text === '') return;

  addTask(text);
  taskInput.value = '';
});
```

---

## Fixed

```js
addBtn.addEventListener('click', function () {
  const text = taskInput.value.trim();
  if (text === '') return;

  addTask(text);
  taskInput.value = '';
});
```

---

## Result
- Tasks are now added only when the button is clicked
- Prevents accidental task creation
- Improves overall user experience

---

# 🧩 Bug 5 — Priority Dropdown Not Resetting

## Description
After adding a task, the priority dropdown remained on the previously selected value instead of resetting to the default option.

---

## File
`script.js`

---

## Line
~15–20

---

## Cause
Only the text input field was being reset after task creation. The priority dropdown value was not reset.

---

## Original

```js
input.value = "";
```

---

## Fixed

```js
input.value = "";
document.getElementById("priority").value = "medium";
```

---

## Result
- Task input clears correctly after submission
- Priority dropdown now resets to default value (`medium`)
- Improves consistency and user experience when adding multiple tasks

---

# ✅ Final Outcome

After applying all fixes:

- Task completion works correctly
- Delete functionality removes correct tasks
- Filters display correct task categories
- Add button behaves as intended
- Priority resets correctly after task creation
- Application state and UI remain synchronized
