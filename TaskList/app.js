// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//Load all eventListeners
loadEventListeners();

function loadEventListeners(){

    // Load DOM event 

    document.addEventListener('DOMContentLoaded',getTasks);

    // add task event
    form.addEventListener('submit', addTask);

    // remove task event
    taskList.addEventListener('click', removeTask);

    // Clear btn event 
    clearBtn.addEventListener('click', clearTasks);

    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}


// Get tasks from Local Storage function
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
    });
}
// Add task
function addTask(e){
    if(taskInput.value === '') {
        alert('Enter your task');
    }
    
    //Create li element
    const li = document.createElement('li');
    //Add a class
    li.className = 'collection-item';
    //Create a textNode and append it to the li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create a link element
    const link = document.createElement('a');
    //Add a class
    link.className = 'delete-item secondary-content';
    //Add an icon html
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    // Append the link to the li
    li.appendChild(link);
    // Append the li to ul 
    taskList.appendChild(li);

    //Store in localStorage
    storeTaskInLocalStorage(taskInput.value);

    // Clear the input
    taskInput.value = "";
    e.preventDefault();
}

// Store in localStorage function

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task function

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
       
    if(confirm('Are you sure?')) {
        e.target.parentElement.parentElement.remove();
        //remove from LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
    }
}

// Remove task from LS function

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks function

function clearTasks(){
    // taskList.innerHTML = '';

    // Faster way
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    } 

    // Clear tasks from LS
    clearTasksFromLocalStorage();
}

// Clear tasks from LS function
function clearTasksFromLocalStorage(){
   localStorage.removeItem('tasks');
}

function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
         const item = task.firstChild.textContent;
         if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = "block";
         } else {
            task.style.display = 'none';
         }
    });
}


