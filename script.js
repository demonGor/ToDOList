
$(function () {
  $("#sortable").sortable({
    placeholder: "ui-sortable-placeholder"
  });
});

const getFromStorage = () => {
  return JSON.parse(localStorage.getItem('todosArray')) || [];
}

const addToStorage = (item) => {
  const arr = getFromStorage();
  arr.push(item);
  localStorage.setItem('todosArray', JSON.stringify(arr));
}

const removeFromStorage = (id) => {
  const arr = getFromStorage();
  const newArr = arr.filter((el) => el.id !== id);
  localStorage.setItem('todosArray', JSON.stringify(newArr));
}

const createTodo = (todo, id) => {
  var template = document.createElement('template');
  let li = `
    <li>
      <input id='label-${id}' class='label' type='checkbox' />
      <label for='label-${id}'>
        <h2>${todo}</h2>
        </label>
      <button id='delete-${id}' class='delete-todo'>X</button>

    </li>
  `;

  li = li.trim();
  template.innerHTML = li;
  list.insertBefore(template.content.firstChild, null);
}

const initilize = (todos) => {
  for (let i = 0; i < todos.length; i++) {
    createTodo(todos[i].action, todos[i].id);
  }
}

const addButton = document.querySelector('.add-input');
const input = document.querySelector('.todo-input');
const list = document.getElementById('sortable');

addButton.addEventListener('click', () => {
  const action = input.value;
  const newId = getIdNewId() || 0;
  createTodo(action, newId);
  addToStorage({
    action,
    isDone: false,
    id: newId
  })

  input.value = '';
});

list.addEventListener('click', (e) => {
  if (e.target.className === 'delete-todo') {
    const indexToDelete = parseInt(e.target.id.split('-')[1]);
    removeFromStorage(indexToDelete);
    list.removeChild(e.target.parentNode);
  }
});

const getIdNewId = () => {
  const arr = getFromStorage().map(el => el.id).sort((a, b) => a - b);
  return arr[arr.length - 1] + 1;
}

const todos = getFromStorage();
initilize(todos);
