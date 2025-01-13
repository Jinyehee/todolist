const addBtn = document.querySelector("#addBtn");

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && todoInput.value !== "") {
    createTodo();
  }
});

addBtn.addEventListener("click", function () {
  if (todoInput.value !== "") {
    createTodo();
  }
});

function createTodo() {
  const todoCreate = document.querySelector("#todoCreate");
  const newLi = document.createElement("li");
  const newCheck = document.createElement("input");
  newCheck.type = "checkbox";
  const newConn = document.createElement("span");
  const newSpan = document.createElement("span");
  const todoInput = document.querySelector("#todoInput");

  newLi.appendChild(newCheck);
  newLi.appendChild(newConn);
  newLi.appendChild(newSpan);

  newConn.textContent = todoInput.value;
  newSpan.textContent = "☒";
  todoCreate.appendChild(newLi);

  todoInput.value = "";

  newCheck.addEventListener("click", function () {
    todoDone(newCheck, newConn);
  });

  newSpan.addEventListener("click", function () {
    newLi.style.display = "none";
  });
}

function todoDone(newCheck, newConn) {
  if (newCheck.checked) {
    newConn.style.textDecoration = "line-through";
  } else {
    newConn.style.textDecoration = "none";
  }
}
