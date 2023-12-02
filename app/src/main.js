import './style.css';
import { v4 as uuidv4 } from 'uuid';
import { getAllTodos, initializeTodosIfEmpty, addTodo, toggleTodoComplete, deleteTodo } from './data-layer-utils';

const renderTodoCard = (todo) => {
  const todosList = document.querySelector("ul#todos-list");
  const li = document.createElement('li');
  const h3 = document.createElement('h3');
  const label = document.createElement('label');
  const deleteButton = document.createElement('button');

  li.dataset.uuid = todo.uuid;
  li.classList.add('todo-card');
  h3.textContent = todo.title;

  label.innerHTML = `
    Is Complete
    <input type="checkbox" name="isComplete" ${todo.isComplete ? "checked" : ""}>
  `

  deleteButton.textContent = 'delete';
  deleteButton.classList.add('delete-todo')

  li.append(h3, label, deleteButton);
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
  const uuid = e.target.parentElement.parentElement.dataset.uuid;
  toggleTodoComplete(uuid);
  renderTodos();
}

const handleDeleteTodo = (e) => {
  if (!e.target.matches('button.delete-todo')) return;

  const uuid = e.target.parentElement.dataset.uuid;
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