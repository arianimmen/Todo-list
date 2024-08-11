let todos = [];

const submit_button = document.querySelectorAll(".todos__submit");
const pop_up = document.querySelector(".pop-up");
const pop_up_cancel_btn = document.querySelector(".pop-up__cancel__btn");
const pop_up_confirm_btn = document.querySelector(".pop-up__confirm__btn");
const pop_up_title = document.querySelector(".pop-up__title");
const pop_up_description = document.querySelector(".pop-up__description");
const todos_container = document.querySelector(".todos__container");
const todos_image_section = document.querySelector(".todos__image-section");
const todo_remove = document.querySelector(".todo__remove");

//----------------------------- Pop up logic --------------------------------

submit_button.forEach((btn) => {
  btn.addEventListener("click", openPopUp);
});
function openPopUp() {
  pop_up.classList.add("block");
}

pop_up_cancel_btn.addEventListener("click", closePopup);
function closePopup(e) {
  e.preventDefault();
  pop_up.classList.remove("block");
}

// --------------------------- Adding to the array --------------------------

pop_up_confirm_btn.addEventListener("click", addTodos);
function addTodos(e) {
  e.preventDefault();
  const Todo = {
    id: Date.now(),
    title: pop_up_title.value,
    description: pop_up_description.value,
    date: new Date().toISOString(),
    isCompleted: false,
  };
  todos.push(Todo);
  closePopup(e);
  addingToDom(todos);
  pop_up_title.value = "";
  pop_up_description.value = "";
  todos_image_section.classList.add("hidden");
  console.log(todos_image_section.classList);
}

// -------------------------- Adding from array to DOM ------------------------

function addingToDom(todos) {
  todos.reverse();
  let allString = "";
  todos.forEach((todo) => {
    allString += `<li class="todos__self">
            <div class="todo__self__left">
              <div class="todo__check"></div>
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
              />
              <img
                src="./assets/images/4781812_bin_delete_file_garbage_recycle_icon.svg"
                alt="trashcan icon"
                class="todo__remove"
              />
            </div>
          </li>`;
  });
  todos_container.innerHTML = allString;
}

// ------------------------ Removing from the array -------------------------------
// todo_remove.addEventListener("click",removeFromTodos)
// function removeFromTodos() {

  
// }