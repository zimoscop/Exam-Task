const URL = "https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7";
const input = document.querySelector(".find");
const textbox = document.querySelector(".textbox");

const response = await fetch(URL);
console.log(response);
const data = await response.json();
console.log(data);

function createTextBox(obj) {
  const textbox = document.createElement("div");
  const input = document.createElement("input");
  textbox.className = "textbox";
  textbox.innerHTML = `<h2>${obj.title}</h2>
                       <p>${obj.body}</p>`;
  input.type = "checkbox";
  input.addEventListener("click", () => {
    textbox.classList.toggle("checked");
  });
  textbox.append(input);
  return textbox;
}

data.forEach((el) => {
  document.querySelector(".box").append(createTextBox(el));
});

function articleFinder(event) {
  document.querySelector(".box").innerHTML = "";
  data
    .filter((obj) =>
      obj.title.toLowerCase().trim().includes(event.target.value)
    )
    .forEach((obj) =>
      document.querySelector(".box").append(createTextBox(obj))
    );
}

input.addEventListener("input", articleFinder);
