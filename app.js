// Define UI Variables

const form = document.querySelector('#todo-form');
const todoList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-todo-list');
const filter = document.querySelector('#filter');
const todoInput = document.querySelector('#todoInput');

// Load All Event Listeners

loadEventListeners();

// Load All Event Listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTodos);
  // Add To Do Event
  form.addEventListener('submit', addToDo);
  // Remove To Do Event
   todoList.addEventListener('click', removeTodo);
  // Clear To Do Event
  clearBtn.addEventListener('click', clearTodo);
  // Filter To do list Event
  filter.addEventListener('keyup', filterTodos);
  }

// Get Todos from Local Storage

function getTodos() {
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(function(todo) {
    // Create li element
    const li = document.createElement('li');
    // Add class name
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(todo));
    // Create new link element
    const link = document.createElement('a');
    // Add class 
    console.log(link);
    link.className = 'delete-item secondary-content';
    // Add Icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>'
    // Append link to li
    li.appendChild(link);
    // Append li to ul
    todoList.appendChild(li);
  });
}


// Add To Do Item

function addToDo(e) {
  if(todoInput.value === '') {
    alert('Please add a to do item');
  }

  // Create li element
  const li = document.createElement('li');
  // Add class name
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(todoInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class 
  console.log(link);
  link.className = 'delete-item secondary-content';
  // Add Icon HTML
  link.innerHTML = '<i class="fa fa-remove"></i>'
  // Append link to li
  li.appendChild(link);
  // Append li to ul
  todoList.appendChild(li);

  // Store in Local Storage
  storeTodoInLocalStorage(todoInput.value);

  // Clear input
  todoInput.value = '';

  e.preventDefault();
  
}

// Store Task

function storeTodoInLocalStorage(todo) {
  let todos;
  if(localStorage.getItem('todo') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);

  localStorage.setItem('todos', JSON.stringify(todos));
}

// Remove To Do 

function removeTodo(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are You Sure?')) {
    e.target.parentElement.parentElement.remove();

    // Remove from Local Storage

    removeTodoFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from local storage

  function removeTodoFromLocalStorage(todoitem) {
    let todos;
    if(localStorage.getItem('todo') === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(task, index){
      if(todoItem.textContent === task) {
        todos.splice(index, 1);
      }
    });

    localStorage.setItem('todos', JSON.stringify(todos));
  }

// Clear To Dos

function clearTodo() {
  // todoList.innerHTML = '';

  // Faster while loop through list
  while(todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }
}

// Filter To dos 

function filterTodos(e) {
  const text = e.target.value.toLowerCase();
  
  document.querySelectorAll('.collection-item').forEach(function(todo){
    const item = todo.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1) {
      todo.style.display = 'block';
    } else {
      todo.style.display = 'none';
    }
  });
}