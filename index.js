const addBtn = document.querySelector("#addBtn");
const todoInput = document.querySelector("#todoInput");
const todoCreate = document.querySelector("#todoCreate");

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
  const newLi = document.createElement("li");
  const newCheck = document.createElement("input");
  newCheck.type = "checkbox";
  const newConn = document.createElement("span");
  const newSpan = document.createElement("span");

  newLi.appendChild(newCheck);
  newLi.appendChild(newConn);
  newLi.appendChild(newSpan);

  let todoContents = todoInput.value;

  if (storageData) {
    todoContents = storageData.contents;
  }

  newConn.textContent = todoContents;
  newSpan.textContent = "☒";
  todoCreate.appendChild(newLi);

  todoInput.value = "";

  newCheck.addEventListener("click", function () {
    newLi.classList.toggle("complete");
    saveItems();
  });

  if (storageData && storageData.complete === true) {
    newLi.classList.add('complete')
    newCheck.checked = true;
  }

  newSpan.addEventListener("click", function () {
    newLi.remove();
    saveItems();
  });

  saveItems();
}

function saveItems() {
  const saveItem = [];
  for (let i = 0; i < todoCreate.children.length; i++) {
    const li = todoCreate.children[i];
    const newConn = li.querySelector("span");
    const todoObj = {
      contents: newConn.textContent,
      complete: li.classList.contains("complete"),
    };
    saveItem.push(todoObj);
  }

  if (saveItem.length === 0) {
    localStorage.removeItem('saved-items')
  }else{
      localStorage.setItem('saved-items', JSON.stringify(saveItem));
  }
}