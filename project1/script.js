// Selecting necessary elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const todoList = document.getElementById("todoList");

// Add Task Button Click Event
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    addTask(taskText);
    taskInput.value = ""; // Clear input
  } else {
    alert("Please enter a task.");
  }
});

// Function to Add Task
function addTask(taskText) {
  const listItem = document.createElement("li");
  listItem.className = "todo-item";

  // Create Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "checkbox";

  // Create Task Span
  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;

  // Mark as Completed when Checkbox is Checked
  checkbox.addEventListener("change", () => {
    listItem.classList.toggle("completed");
  });

  // Create Delete Button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";

  // Delete Task
  deleteBtn.addEventListener("click", () => {
    todoList.removeChild(listItem);
  });

  // Append all elements to list item
  listItem.appendChild(checkbox);
  listItem.appendChild(taskSpan);
  listItem.appendChild(deleteBtn);
  todoList.appendChild(listItem);
}
