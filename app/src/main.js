import './style.css';
import { v4 as uuidv4 } from 'uuid';
import { getAllTodos, initializeTodosIfEmpty, addTodo, toggleTodoComplete, deleteTodo } from './data-layer-utils';

const renderTodoCard = (todo) => {
  const todosList = document.querySelector("ul#todos-list");
  const li = document.createElement('li');
  const h3 = document.createElement('h3');

  li.dataset.uuid = todo.uuid;
  li.classList.add('todo-card');
  h3.textContent = todo.title;

  const labelInputButton = document.createElement('div');
  labelInputButton.innerHTML = `
    <label>
      Complete
      <input type="checkbox" name="isComplete" ${todo.isComplete ? "checked" : ""}>
    </label>
    <button class='delete-todo'>🗑️</button>`

  li.append(h3, labelInputButton);
  todosList.append(li);
}

const renderTodos = () => {
  const ul = document.querySelector("ul#todos-list");
  ul.innerHTML = "";
  const todos = getAllTodos();
  todos.forEach((todo) => renderTodoCard(todo));
}

const handleTodoChange = (e) => {
  if (!e.target.matches('input[type="checkbox"]')) return;
  const uuid = e.target.closest('#todos-list>li').dataset.uuid;
  toggleTodoComplete(uuid);
  renderTodos();
}

const handleDeleteTodo = (e) => {
  if (!e.target.matches('button.delete-todo')) return;
  const uuid = e.target.closest('#todos-list>li').dataset.uuid;
  deleteTodo(uuid);
  renderTodos();
}

const handleNewTodo = (e) => {
  e.preventDefault();

  const form = e.target;
  const newTodo = {
    uuid: uuidv4(),
    title: form.todoTitle.value,
    isComplete: false
  }
  addTodo(newTodo);
  renderTodos();

  form.reset();
}

const main = () => {
  initializeTodosIfEmpty();
  renderTodos();

  document.querySelector("ul#todos-list").addEventListener('input', handleTodoChange);
  document.querySelector("ul#todos-list").addEventListener('click', handleDeleteTodo);
  document.querySelector("form#new-todo-form").addEventListener('submit', handleNewTodo);
}
main();