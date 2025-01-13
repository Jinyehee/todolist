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

const savedTodoList = JSON.parse(localStorage.getItem("saved-items"));

if (savedTodoList) {
  for (let i = 0; i < savedTodoList.length; i++) {
    createTodo(savedTodoList[i]);
  }
}

function createTodo(storageData) {
  let todoContents = todoInput.value;

  if (storageData) {
    todoContents = storageData.contents;
  }

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

    newLi.classList.toggle("complete");

    saveItems();
  });

  newSpan.addEventListener("click", function () {
    newLi.style.display = "none";
  });

  saveItems();
}

function todoDone(newCheck, newConn) {
  if (newCheck.checked) {
    newConn.style.textDecoration = "line-through";
    newConn.style.color = "gray";
  } else {
    newConn.style.textDecoration = "none";
  }
}

function saveItems() {
  const saveItem = [];
  for (let i = 0; i < todoCreate.children.length; i++) {
    const todoObj = {
      contents: todoCreate.children[i].newConn.textContent,
      complete: todoCreate.children[i].classList.contains("complete"),
    };
    saveItem.push(todoObj);
  }
  console.log(saveItem);
  localStorage.setItem("saved-items", JSON.stringify(saveItem));
}
