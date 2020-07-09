const addTodoInput = document.querySelector("#addTodoInput");
const addTodoBtn = document.querySelector("#addTodoBtn");
const todosContainer = document.querySelector("#todosContainer");

let id = 0;
const todosArray = [];

class Todo {
    constructor(text) {
        this.text = text;
        this.finished = false;
        this.id = id++; // ensures that each todo has a unique key

        todosArray.push(this);
    }

    createFragment() {
        const fragment = new DocumentFragment();

        const div = document.createElement("div");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("click", () => {toggleTodo(this.id)});
        (this.finished) ? checkbox.setAttribute("checked", true) : checkbox.removeAttribute("checked");
        div.appendChild(checkbox);
        
        const text = document.createElement("span");
        text.innerText = this.text + " ";
        (this.finished) ? text.classList.add("strikedOut") : text.classList.remove("strikedOut");
        div.appendChild(text);
        
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.innerText = "×";
        deleteBtn.addEventListener("click", () => {deleteTodo(this.id)});
        div.appendChild(deleteBtn);

        fragment.appendChild(div);
        return fragment;
    }
}

function renderTodos() {
    const todosContainer = document.querySelector("#todosContainer");

    // clear the container first
    todosContainer.innerHTML = "";

    for (const todo of todosArray) {
        const fragment = todo.createFragment();
        todosContainer.appendChild(fragment);
    }
}

function deleteTodo(idToDelete) {
    const i = todosArray.map(todo => todo.id).indexOf(idToDelete);
    todosArray.splice(i, 1);
    renderTodos();
}

// when you click a todo item to cross it out or uncross it out
function toggleTodo(idToToggle) {
    const i = todosArray.map(todo => todo.id).indexOf(idToToggle);
    todosArray[i].finished = !todosArray[i].finished;
    renderTodos();
}


addTodoBtn.addEventListener("click", event => {
    event.preventDefault();

    // make sure input isn't empty
    if (addTodoInput.value.trim() === "") {
        alert("You must enter a todo!");
        return;
    }

    const text = addTodoInput.value;
    const newTodo = new Todo(text);

    renderTodos(todosArray);

    // clear input
    addTodoInput.value = "";
});
