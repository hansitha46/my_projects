// Selecting necessary elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const todoList = document.getElementById("todoList");

// Add Task Button Click Event

let tasks = [];
loadTasks();
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    addTask(taskText);
    taskInput.value = ""; // Clear input
  } else {
    alert("Please enter a task.");
  }
});



function addTask(task){
  let taskItem ={
    text: task,
    completed : false,
  };
  tasks.push(taskItem);
  saveTasks();
  renderList();

}

function renderList(){
  let taskItemsList = tasks.map((task,index)=>
  {
    return `<li class="todo-item">
        <input type="checkbox" ${task.completed ? 'checked':''}>
        <span>${task.text}</span>
        <button class="delete-btn">Delete</button>

    </li>`
  }).join("");
  todoList.innerHTML = taskItemsList;

}

todoList.addEventListener('click',(event)=>{
  if(event.target.tagName === 'INPUT'){
    const taskIndex = tasks.findIndex((task)=> task.text ===event.target.parentNode.querySelector('span').innerText);
    if(taskIndex !== -1){
        tasks[taskIndex].completed = event.target.checked;
        event.target.parentNode.classList.toggle("completed");
        renderList();
    }
  }
   else if(event.target.tagName === 'BUTTON'){
    const taskIndex = tasks.findIndex((task)=> task.text ===event.target.parentNode.querySelector('span').innerText);
    if(taskIndex !== -1){
        tasks.splice(taskIndex,1);
        renderList();
    }
  }
  saveTasks();
})


function saveTasks(){
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

function loadTasks(){
  const tasksLoaded = localStorage.getItem('tasks');
  if(tasksLoaded){
  tasks = JSON.parse(tasksLoaded);
  renderList();
  }
}



