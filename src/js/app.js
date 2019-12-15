const todoList = Array.from(document.querySelectorAll(".main__todo__list"));
const doneList = document.querySelector(".main__done__list");
const addBtn = document.querySelector(".main__btn");
const deleteBtn = document.querySelector(".delete");
const editBtn = document.querySelector(".edit");
const input = document.querySelector(".main__input");

//Add new ToDo
addBtn.addEventListener("click", e => {
  e.preventDefault();
  createTask();
  clearInput();
});

//Delete and Edit Item
todoList.map(x => {
  x.addEventListener("click", e => {
    e.preventDefault();
    if (e.target.classList.value === "delete") {
      return e.target.parentNode.remove();
    } else if (e.target.classList.value === "edit") {
      let eTarget = e.target.parentNode;
      eTarget.classList.toggle("edit-mode");
      eTarget.querySelector("input[type=text]").value = eTarget.querySelector(
        "label"
      ).textContent;
      eTarget.querySelector("input[type=text]").focus()
      e.target.addEventListener("click", () => {
        console.log(eTarget.querySelector("label").textContent);
        eTarget.querySelector("label").textContent = eTarget.querySelector(
          "input[type=text]"
        ).value;
      });
    } else if (e.target.value === 'on') {
        let eTarget = e.target.parentNode
        eTarget.querySelector('input[type=checkbox]').toggleAttribute('checked')
        document.querySelector('.done').insertAdjacentElement('beforeend', eTarget.cloneNode(true)).classList.add('done')
        eTarget.remove() 
    }
  });  
})

function createTask() {
  let text = input.value;
  if (input.value === "") {
    return alert("Need some task");
  } else {
    let newLi = `
        <li class="main__todo__list-item">
            <input type="checkbox">
            <label>${text}</label>
            <input type="text">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </li>
        `;
    return document.querySelector('.main__todo__list').insertAdjacentHTML("beforeend", newLi);
  }
}

function clearInput() {
  input.value = "";
  input.focus();
}
