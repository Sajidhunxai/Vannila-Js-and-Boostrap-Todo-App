const todoList = [];
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoListEl = document.getElementById("todoList");

addBtn.addEventListener("click", function () {
  const todoItem = {
    text: todoInput.value,
    completed: false,
  };

  todoList.push(todoItem);

  renderTodoList();
  todoInput.value = "";
});

function renderTodoList() {
    let list = "";
    todoList.forEach((todo, index) => {
        list += `
        <li class="list-group-item ${todo.completed ? "completed" : ""}">
            <div>
            <input type="checkbox" class="form-check-input" id="todoCheck${index}" ${
        todo.completed ? "checked" : ""
        } />
            <label for="todoCheck${index}">${todo.text}</label>
            </div>
            <div>
            <button class="btn btn-sm btn-primary edit-btn" data-id="${index}">Edit</button>
            <button class="btn btn-sm btn-danger delete-btn" data-id="${index}">Delete</button>
            </div>
        </li>
        `;
    });

    todoListEl.innerHTML = list;

    const deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
        const id = Number(btn.getAttribute("data-id"));
        todoList.splice(id, 1);
        renderTodoList();
        });
    });

    const editBtns = document.querySelectorAll(".edit-btn");
    editBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
        const id = Number(btn.getAttribute("data-id"));
        const todoItem = todoList[id];
        const newText = prompt("Enter new text", todoItem.text);
        if (newText !== null && newText !== "") {
            todoItem.text = newText;
            renderTodoList();
        }
        });
    });

    const todoCheckboxes = document.querySelectorAll(".form-check-input");
    todoCheckboxes.forEach((checkbox, index) => {
        checkbox.addEventListener("change", function () {
        todoList[index].completed = checkbox.checked;
        renderTodoList();
        });
    });
    }

    renderTodoList();
