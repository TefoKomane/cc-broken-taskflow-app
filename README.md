# cc-broken-taskflow-app

#  JavaScript Todo App — Bug Fix Project

##  Overview
This project is part of the ZAIO Week 6 group assignment focused on JavaScript events, functions, and DOM manipulation.

The objective was to debug and fix a broken Todo App by identifying issues, documenting findings, and implementing fixes through separate branches and pull requests.

---

#  Features

- Add tasks
- Mark tasks as completed
- Delete tasks
- Filter tasks (All / Active / Completed)
- Priority selection support
- Dynamic DOM rendering

---

# Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla JS)

---

#  Bugs Fixed

##  Checkbox Completion State
Fixed checkbox functionality so tasks correctly toggle between completed and active states.

##  Delete Task Functionality
Fixed delete button to correctly remove selected tasks.

##  Active Filter Logic
Corrected filtering logic so active tasks display properly.

##  Add Button Event
Changed incorrect hover event to click event.

##  Priority Reset
Reset priority dropdown to default after adding a task.

---

#  Project Structure

```bash
project-folder/
│
├── index.html
├── style.css
├── script.js
│
└── docs/
    └── bug-report.md
```

---

#  How to Run

1. Clone the repository

```bash
git clone <repo-link>
```

2. Open the project folder

3. Run `index.html` in the browser

---

#  Documentation

Detailed bug analysis and fixes can be found in:

```bash
/docs/bug-report.md
```

---

#  Branching Strategy

Each bug fix was completed on its own branch:

- `fix-checkbox-toggle`
- `fix-delete-task`
- `fix-active-filter`
- `fix-add-button-event`
- `fix-priority-reset`

---

#  Pull Requests

Each branch includes:
- Bug description
- Root cause analysis
- Fix implementation
- Result verification

---

#  Team Workflow

- Each member independently investigated bugs
- Findings were regrouped and documented
- Fixes were implemented separately
- Pull requests were reviewed collaboratively

---

#  Loom Walkthrough

A walkthrough explaining the debugging process and fixes was recorded as part of the deliverables.

---

#  Final Result

The Todo App now functions correctly with:
- Stable event handling
- Correct task state updates
- Reliable DOM rendering
- Improved user interaction and consistency
