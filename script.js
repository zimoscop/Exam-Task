const URL = "https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7";
const input = document.querySelector(".find");
const textbox = document.querySelector(".textbox");
const cnt = document.querySelector(".cnt");
const div = document.querySelector(".find_and_count");
const cntText = document.querySelector(".cnt_text");
const btn = document.querySelector(".btn_find");
const reset = document.querySelector(".reset");
const btnResetAll = document.querySelector(".reset_all");
const box = document.querySelector(".box");

const response = await fetch(URL);
const data = await response.json();

function eventPrevDef(e) {
  e.preventDefault();
}
btn.addEventListener("submit", eventPrevDef);

// function replaceLocation() {
//   console.log("work");
//   if (localStorage) {
//     history.replaceState(
//       null,
//       null,
//       `http://127.0.0.1:5500/?find=${localStorage.getItem("case")}`
//     );
//   }
// }
// btn.addEventListener("click", replaceLocation);

// выводит статьи
function createTextBox(obj) {
  const textbox = document.createElement("div");
  const input = document.createElement("input");
  textbox.className = "textbox";
  textbox.innerHTML = `<h2>${obj.title}</h2>
                       <p>${obj.body}</p>`;
  input.type = "checkbox";
  input.className = "textbox__input";
  input.addEventListener("click", () => {
    textbox.classList.toggle("checked");
  });
  reset.addEventListener("click", () => {
    cnt.textContent = "0";
    textbox.classList.remove("checked");
    input.checked = false;
  });
  textbox.append(input);
  return textbox;
}
// выводит сохраненные значения
input.value = localStorage.getItem("case");
localStorage.length
  ? data
      .filter((obj) =>
        obj.title.includes(
          localStorage.getItem("case").toLocaleLowerCase().trim()
        )
      )
      .forEach((obj) => box.append(createTextBox(obj)))
  : data.forEach((el) => box.append(createTextBox(el)));

// выводит последнюю адресную строку
localStorage.length
  ? history.replaceState(
      null,
      null,
      `http://127.0.0.1:5500/?find=${localStorage.getItem("case")}`
    )
  : history.replaceState(null, null, `http://127.0.0.1:5500/?find=`);

// поиск по заголовку
function articleFinder() {
  box.innerHTML = "";
  data
    .filter((obj) =>
      obj.title.toLowerCase().trim().includes(input.value.toLowerCase().trim())
    )
    .forEach((obj) => box.append(createTextBox(obj)));
}
btn.addEventListener("click", articleFinder, { once: true });
btn.addEventListener("click", saveLastCall);
// подсчет выбранных статей
function countCheked() {
  const check = document.querySelectorAll(".textbox.checked");
  let fincheck = [...check];
  let cntOfcheck = fincheck.length;
  cnt.textContent = cntOfcheck;
}
document.querySelector("body").addEventListener("click", countCheked);
// сохнаняет последнее значение поиска
function saveLastCall() {
  if (input.value) {
    if (localStorage.length) {
      localStorage.clear();
      localStorage.setItem("case", input.value);
      input.value = "";
    } else {
      localStorage.setItem("case", input.value);
    }
  }
}
// сброс всего
btnResetAll.addEventListener("click", () => {
  localStorage.clear();
  window.location.reload();
});
