let todos = [];

const submit_button = document.querySelectorAll(".todos__submit");
const pop_up = document.querySelector(".pop-up");
const pop_up_cancel_btn = document.querySelector(".pop-up__cancel__btn");
const pop_up_confirm_btn = document.querySelector(".pop-up__confirm__btn");
const pop_up_title = document.querySelector(".pop-up__title");
const pop_up_description = document.querySelector(".pop-up__description");
const todos_container = document.querySelector(".todos__container");
const todos_image_section = document.querySelector(".todos__image-section");
const todos_title = document.querySelector(".todos__title");
const header_options = document.querySelector(".header__options");
const sidebar_all = document.querySelector(".sidebar__all");
const sidebar_leftTodo = document.querySelector(".sidebar__leftTodo");
const sidebar_completed = document.querySelector(".sidebar__completed");
const edit_task = document.querySelector(".edit-task");
const pop_up_task_back = document.querySelector(".pop_up_task_back");
const confirm_edit = document.querySelector(".confirm_edit");
const pop_up_edit_back = document.querySelector(".pop_up_edit_back");
const pop_up_cancel_btn_edit = document.querySelector(
  ".pop-up__cancel__btn-edit"
);
const pop_up_edit_title = document.querySelector(".pop-up__edit__title");
const pop_up_edit_description = document.querySelector(
  ".pop-up__edit__description"
);
const greeting__submit = document.querySelector(".greeting__submit");
const greeting_input = document.querySelector("#greeting");
const greeting_section = document.querySelector(".greeting");
const username_place = document.querySelector(".Username_place");
const checkbox = document.querySelector("#checkbox");

//----------------------------- Pop up logic --------------------------------

submit_button.forEach((btn) => {
  btn.addEventListener("click", openPopUp);
});
function openPopUp() {
  pop_up.classList.add("block");
  pop_up_task_back.style.display = "block";
}

pop_up_cancel_btn.addEventListener("click", closePopup);
function closePopup(e) {
  e.preventDefault();
  pop_up.classList.remove("block");
  pop_up_title.value = "";
  pop_up_description.value = "";
  pop_up_task_back.style.display = "none";
}

pop_up_task_back.addEventListener("click", closePopup);

// --------------------------- Adding to the array --------------------------

pop_up_confirm_btn.addEventListener("click", addTodos);
function addTodos(e) {
  if (pop_up_title.value === "") {
    alert("Please enter a title");
  } else {
    e.preventDefault();
    const Todo = {
      id: Date.now(),
      title: pop_up_title.value,
      description: pop_up_description.value,
      date: new Date().toISOString(),
      isCompleted: false,
    };
    saveTodos(Todo);
    closePopup(e);
    filtering();
    pop_up_title.value = "";
    pop_up_description.value = "";
    todos_image_section.classList.add("hidden");
  }
}

// -------------------------- Adding from array to DOM ------------------------

function addingToDom(todos, status = "Tasks") {
  sorting(todos);
  todos_title.textContent = status;
  let allString = "";
  todos.forEach((todo) => {
    allString += `<li class="todos__self ${todo.isCompleted && "checked"}">
            <div class="todo__self__left">
              <div class="todo__check" data-todoid = ${todo.id}>
              ${todo.isCompleted ? `<div class="add_circle"></div>` : ""}
              </div>
              <div class="todo__text">
                <p class="todo__title">${todo.title}</p>
                <p class="todo__description">${todo.description}</p>
              </div>
            </div>

            <div class="todos__self__right">
              <img
                src="./assets/images/8666806_edit_write_pen_icon.svg"
                alt="edit icon"
                class="todo__edit"
                data-todoid = ${todo.id}
              />
              <img
                src="./assets/images/4781812_bin_delete_file_garbage_recycle_icon.svg"
                alt="trashcan icon"
                class="todo__remove"
                data-todoid = ${todo.id}
              />
            </div>
          </li>`;
  });
  todos_container.innerHTML = allString;

  const todo_remove = document.querySelectorAll(".todo__remove");
  todo_remove.forEach((btn) => {
    btn.addEventListener("click", removeFromTodos);
  });

  const todo_check = document.querySelectorAll(".todo__check");
  todo_check.forEach((check) => {
    check.addEventListener("click", checked);
  });

  const todo_edit = document.querySelectorAll(".todo__edit");
  todo_edit.forEach((edit) => {
    edit.addEventListener("click", editing);
  });
}

// ------------------------ Removing from the array -------------------------------
function removeFromTodos(e) {
  let todos = getAllTodos();
  id = Number(e.target.dataset.todoid);
  todos = todos.filter((todo) => todo.id !== id);
  sorting(todos);
  localStorage.setItem("todos", JSON.stringify(todos));
  filtering();
  if (todos_container.innerHTML === "") {
    todos_image_section.classList.remove("hidden");
  }
}

// ------------------------- Sorting the array ------------------------------------
function sorting(todos) {
  todos.sort((a, b) => {
    if (a.id < b.id) return 0;
    else return -1;
  });
}
// ------------------------- Checking function -----------------------------------

function checked(e) {
  let todos = getAllTodos();
  todos.forEach((todo) => {
    const id = Number(e.target.dataset.todoid);
    if (todo.id === id) {
      todo.isCompleted = !todo.isCompleted;
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  filtering();
}
// ------------------------------ Filtering -------------------------------------
let current_status = header_options.value;
header_options.addEventListener("change", (e) => {
  current_status = e.target.value;
  filtering();
});

function filtering() {
  // console.log(e.target.value);
  const todos = getAllTodos();
  if (current_status === "all") addingToDom(todos);
  else if (current_status === "completed") {
    const filteredTodos = todos.filter((todo) => {
      return todo.isCompleted == true;
    });
    addingToDom(filteredTodos);
    todos_title.textContent = "Tasks";
    todos_title.textContent = "Completed";
  } else {
    const filteredTodos = todos.filter((todo) => {
      return todo.isCompleted === false;
    });
    addingToDom(filteredTodos);
    todos_title.textContent = "Not-Completed";
  }
  if (todos_container.innerHTML === "") {
    todos_image_section.classList.remove("hidden");
  } else {
    todos_image_section.classList.add("hidden");
  }
}

// ----------------------------- Sidebar filtering ---------------------------------

sidebar_all.addEventListener("click", () => {
  current_status = "all";
  resetColors();
  sidebar_all.classList.add("sidebar__clicked");
  filtering();
});

sidebar_leftTodo.addEventListener("click", () => {
  current_status = "uncompleted";
  resetColors();
  sidebar_leftTodo.classList.add("sidebar__clicked");
  filtering();
});

sidebar_completed.addEventListener("click", () => {
  current_status = "completed";
  resetColors();
  sidebar_completed.classList.add("sidebar__clicked");

  filtering();
});

function resetColors() {
  sidebar_completed.classList.remove("sidebar__clicked");
  sidebar_leftTodo.classList.remove("sidebar__clicked");
  sidebar_all.classList.remove("sidebar__clicked");
}

// ----------------------- Editing todos ---------------------------

function editing(e) {
  const todos = getAllTodos();
  const id = Number(e.target.dataset.todoid);
  todos.forEach((todo) => {
    if (todo.id === id) {
      pop_up_edit_title.value = todo.title;
      pop_up_edit_description.value = todo.description;
    }
  });

  edit_task.classList.add("block");
  pop_up_edit_back.style.display = "block";
  confirm_edit.addEventListener("click", () => {
    todos.forEach((todo) => {
      if (todo.id === id) {
        todo.title = pop_up_edit_title.value;
        todo.description = pop_up_edit_description.value;
        localStorage.setItem("todos", JSON.stringify(todos));
      }
    });
    filtering();
    removeEditPopup();
  });
}

pop_up_cancel_btn_edit.addEventListener("click", removeEditPopup);

pop_up_edit_back.addEventListener("click", removeEditPopup);

function removeEditPopup() {
  edit_task.classList.remove("block");
  pop_up_edit_back.style.display = "none";
}

// --------------------- Greeting Section Logic -----------------------
const remember_me_checker = JSON.parse(localStorage.getItem("username"));
if (remember_me_checker != null) {
  greeting_section.classList.add("hidden");
}

let checkbox_value = false;
greeting__submit.addEventListener("click", greetingFunction);
checkbox.addEventListener("change", (e) => {
  checkbox_value = e.target.checked;
});

function greetingFunction(e) {
  e.preventDefault();
  if (greeting.value === "") {
    alert("Enter a username");
  } else {
    const name = greeting.value.trim().toLowerCase();
    username_place.textContent = `Have a marvelous day off, ${
      name[0].toUpperCase() + name.slice(1).toLowerCase()
    }! `;

    greeting_section.classList.add("hidden");
    if (checkbox_value === true) {
      localStorage.setItem("username", JSON.stringify(name));
    }
  }
}

// --------------------- Creating from LocalStorage -------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const todos = getAllTodos();
  addingToDom(todos);
  if (todos.length != 0) {
    todos_image_section.classList.add("hidden");
  }
});

// ---------------------- Local Storage (Just used for demo!) ----------------------------

function getAllTodos() {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  return savedTodos;
}

function saveTodos(todos) {
  const savedTodos = getAllTodos();
  savedTodos.push(todos);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
  return saveTodos;
}
