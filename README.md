# Todo List Example Project

This README documents my process for building this simple Todo App using Vite. Use it like a tutorial if you would like.

## Why Vite?

Vite is a tool for developing web applications. It works by creating a "development" version of your project and provides a server for previewing and testing that version. In this "development" mode you can quickly iterate on the project and see the application "hot reload" without having to restart the server. 

When it is time to deploy your project, it provides tools for "compiling" the project into a "production" version of the project that can easily be deployed on a third-party hosting service. For basic front-end only applications, we'll use Github Pages. Eventually we'll use a more robust hosting service like Render which can provide a full back-end server and a database server.

Vite can be used for both simple and complex projects, from front-end only applications that use nothing but Vanilla JS to robust full-stack applications using frameworks like React.

Sure, you could build a project from scratch where the "development" version and the "production" version are one-and-the-same. But tools like Vite provide many benefits which you'll learn to appreciate with time and experience.

## Setup 

First, create a Github repository and clone it down.

Inside the repo, create a [Vite](https://vitejs.dev/guide/) project called `app` using the `npm create vite` command:

```sh
npm create vite
# > Project Name: app
# > Select a framework: Vanilla
# > Select a variant: JavaScript
```

This will create a folder in your repo called `app`. This is your **development** version of the application.

Then `cd` into the directory and install Vite dependencies and other dependencies for the project:

```sh
cd app
npm i
npm i uuid
```

Clean up the directory by removing the `counter.js` and `javascript.svg` files and moving the `main.js` and `style.css` files into a `src` directory.

```sh
rm counter.js javascript.svg
mkdir src
mv main.js src/
mv style.css src/
```

Edit the provided starter code:
* Empty out the `main.js` file keeping the `import './style.css'` line.
* Empty out the `style.css` file, keeping the styles you want to keep (I like to keep `:root`, `body`, `h1`, and `#app` styles).
* Edit the `<script>` tag `index.html` (line 11) so that it references `src/main.js`.

To test that everything works, add some code to your `main.js` file...

```js
console.log("hello world");
document.querySelector("#app").innerHTML += '<h1>Hello world</h1>';
```

...and then run the Vite development server from the terminal:

```sh
npm run dev
```

You should be able to preview the application at http://localhost:5173/

Once you've confirmed everything is connected, go ahead and **commit and push**.

## Planning Out The Data

To start this project, I want to keep things simple. I want each of my todos to be an object with at minimum a unique id, a title, and a Boolean for marking the todo as complete or not. So something like this:

```js
{
  uuid: "5affd4e4-418d-4b62-beeb-1c0f7aaff753",
  title: "take out the trash",
  isComplete: false
}
```

It is often helpful to create some example data that can be shown to the user when the application first loads. So I'll create a `todos.json` file in the `src/` directory with an Array of these objects that can be loaded by the application:

```json
[
  {
    "uuid": "5affd4e4-418d-4b62-beeb-1c0f7aaff753",
    "title": "Take out the trash",
    "isComplete": false
  },
  {
    "uuid": "32521ef4-d64c-4906-b06d-f3d0d6b16e0f",
    "title": "Wash the dishes",
    "isComplete": false
  },
  {
    "uuid": "8b144d62-faa7-4226-87e1-096d7c1bedc7",
    "title": "Pay rent",
    "isComplete": true
  }
]
```

Loading this data is easy! In `main.js`, just add:

```js
import initialTodos from './todos.json';
```

The variable name `initialTodos` can be whatever you want.

A little bit of code let's us see this data on the page:

```js
import initialTodos from './todos.json';

initialTodos.forEach((todo) => {
  document.querySelector('#app').innerHTML += `<li>${todo.title}</li>`;
});
```

## Creating a Data Layer for CRUD

The `todos.json` file will just be the "seed" for our application's data. If we want to create, update, or delete todos, we'll use the user's `localStorage`.

To keep things organized, I'll create a separate file called `data-layer-utils.js` with the following functions:

```js
import initialTodos from './todos.json';

//////////////////////////////////
// Generic localStorage Helpers //
//////////////////////////////////

// sets a new key-value pair in local storage.
const setLocalStorageKey = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// tries to get a value from local storage.
const getLocalStorageKey = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.error(error);
    return null;
  }
}

///////////////////////
// Todo List Helpers //
///////////////////////

// stores todos the todos.json file in localStorage, but only if localStorage doesn't have them already
export const initializeTodosIfEmpty = () => {}
// returns the Array of all todo Objects
export const getAllTodos = () => {} 
// adds a new todo Object to the Array of todos in localStorage
export const addTodo = (todo) => { } 
// finds a todo by uuid and replaces it with the given todo in localStorage
export const updateTodo = (uuid, todo) => { } 
// finds a todo by uuid and removes it from the Array of todos
export const deleteTodo = (uuid) => { } 
```

Once I complete these functions, I'll import them into `main.js` and test them out:

```js
import './style.css';
import { getAllTodos, initializeTodosIfEmpty, addTodo, updateTodo, deleteTodo } from './data-layer-utils';

const main = () => {
  initializeTodosIfEmpty();
  console.log(getAllTodos());
  addTodo({ uuid: 1, name: 'ben' });
  console.log(getAllTodos());
  updateTodo(1, { name: 'liz' });
  console.log(getAllTodos());
  deleteTodo(1);
  console.log(getAllTodos());
}

main();
```

Once I've confirmed that I can get all todos, create a new todo, update the todo, and delete it, I'll **commit and push** my progress.

## Rendering All Todos

Now that I can manage the todos using `localStorage`, I can start building out the UI.

1. I'll start by rendering the initial set of default todos. 
2. Then, I'll add functionality for updating a todo (marking it as complete / incomplete)
3. Then, I'll add functionality for deleting a todo
4. Finally, I'll add a form for adding new todos

To render each todo, I them to be in a list and each have this HTML structure:

```html
<li data-uuid="123456789" class='todo-card'>
  <h3>Todo title</h3>
  <label>
    Is Complete
    <input type="checkbox" name="isComplete">
  </label>
</li>
```

To achieve this in an organized fashion, in `main.js` I'll create two new functions:

```js
const renderTodoCard = (todo) => {
  // creates a new li with the information from the todo
  // appends it to the ul
}

const renderTodos = () => {
  const todos = getAllTodos();
  todos.forEach((todo) => renderTodoCard(todo));
}

const main = () => {
  initializeTodos();
  renderTodos();
}
```


## Configure Vite for Deployment on Github Pages

Create a Vite configuration file

```sh
touch vite.config.js
```

And put this inside:

```js
import { defineConfig } from 'vite'

export default defineConfig({
  // GitHub Pages expects an index.html in the root directory
  // so just run npm build before pushing to GitHub and this will rebuild our assets to the root
  build: { outDir: '..' },
});
```

Now, run the command

```sh
npm run build
```

This will **compile** the code you've written in your `app/` folder into ordinary and "minified" static files that can easily be served by Github pages. It will put those files in the root directory of your repo, where Github expects to find an `index.html` file and any associated assets.

You can see what this "deployed" version will look like by running the command...

```sh
npm run preview
```

...which will serve the application at http://localhost:4173/

Finally, **commit and push** your new compiled version to Github.
