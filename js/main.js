const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

let tasks = [];

form.addEventListener("submit", addTask);
tasksList.addEventListener('click', doneTask)
tasksList.addEventListener("click", deleteTask);


function addTask(event) {
  event.preventDefault();

  const taskText = taskInput.value;
  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false
  };
  


  const cssClass = newTask.done ? "task-title task-title--done" :  'task-title'


  tasks.push(newTask)
  const taskHTML = `	
  <li id='${newTask.id}' class="list-group-item d-flex justify-content-between task-item">
    <span class="${cssClass}">${newTask.text}</span>
    <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-action">
            <img src="./img/tick.svg" alt="Done" width="18" height="18">
        </button>
        <button type="button" data-action="delete" class="btn-action">
            <img src="./img/cross.svg" alt="Done" width="18" height="18">
        </button>
    </div>
 </li>`;
  tasksList.insertAdjacentHTML("beforeend", taskHTML);

  taskInput.value = "";
  taskInput.focus();

  if (tasksList.children.length > 1) {
    emptyList.classList.add("none");
  }
}
function deleteTask(event) {
  if (event.target.dataset.action === "delete") {
    const parentNode = event.target.closest(".list-group-item");

    const id = Number(parentNode.id);

    const index = tasks.findIndex(function(task){
       return task.id === id;
    })
    

    tasks.splice(index,1) 
    parentNode.remove();
    
  }

  if (tasksList.children.length == 1) {
    emptyList.classList.remove("none");
    
  }

}

function doneTask(event) {
    if(event.target.dataset.action === 'done'){
        const parentNode = event.target.closest('.list-group-item')
        const tasksTitle = parentNode.querySelector('.task-title');
        tasksTitle.classList.toggle('task-title--done')
        
    }

}

