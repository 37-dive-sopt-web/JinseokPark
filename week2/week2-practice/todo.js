const todo_form = document.getElementById("todo_form");
const todo_input = todo_form.querySelector("input");
const todo_list = document.getElementById("todo_list");

// todo를 담을 배열
let todos = [];

// 화면 출력을 위한 HTML 태그 추가 함수
function paintTodo(todo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerText = todo;
  li.appendChild(span);
  todo_list.appendChild(li);
}

// 폼이 submit 되었을 때, 배열에 추가 -> local storage 추가
function updateTodo() {
  todos.push(todo_input.value);
  localStorage.setItem("todo", JSON.stringify(todos));
  todo_input.value = "";
}

// 이벤트리스너 추가
todo_form.addEventListener("submit", updateTodo);

// localStorage에서 가져오기
const savedTodos = localStorage.getItem("todo");

// parse 해서 각 요소 출력
if (savedTodos) {
  todos = JSON.parse(savedTodos);
  todos.forEach(paintTodo);
}
