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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgdG9kb0xpc3QgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubWFpbl9fdG9kb19fbGlzdFwiKSk7XG5jb25zdCBkb25lTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbl9fZG9uZV9fbGlzdFwiKTtcbmNvbnN0IGFkZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbl9fYnRuXCIpO1xuY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kZWxldGVcIik7XG5jb25zdCBlZGl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lZGl0XCIpO1xuY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW5fX2lucHV0XCIpO1xuXG4vL0FkZCBuZXcgVG9Eb1xuYWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjcmVhdGVUYXNrKCk7XG4gIGNsZWFySW5wdXQoKTtcbn0pO1xuXG4vL0RlbGV0ZSBhbmQgRWRpdCBJdGVtXG50b2RvTGlzdC5tYXAoeCA9PiB7XG4gIHguYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LnZhbHVlID09PSBcImRlbGV0ZVwiKSB7XG4gICAgICByZXR1cm4gZS50YXJnZXQucGFyZW50Tm9kZS5yZW1vdmUoKTtcbiAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC52YWx1ZSA9PT0gXCJlZGl0XCIpIHtcbiAgICAgIGxldCBlVGFyZ2V0ID0gZS50YXJnZXQucGFyZW50Tm9kZTtcbiAgICAgIGVUYXJnZXQuY2xhc3NMaXN0LnRvZ2dsZShcImVkaXQtbW9kZVwiKTtcbiAgICAgIGVUYXJnZXQucXVlcnlTZWxlY3RvcihcImlucHV0W3R5cGU9dGV4dF1cIikudmFsdWUgPSBlVGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIFwibGFiZWxcIlxuICAgICAgKS50ZXh0Q29udGVudDtcbiAgICAgIGVUYXJnZXQucXVlcnlTZWxlY3RvcihcImlucHV0W3R5cGU9dGV4dF1cIikuZm9jdXMoKVxuICAgICAgZS50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZVRhcmdldC5xdWVyeVNlbGVjdG9yKFwibGFiZWxcIikudGV4dENvbnRlbnQpO1xuICAgICAgICBlVGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoXCJsYWJlbFwiKS50ZXh0Q29udGVudCA9IGVUYXJnZXQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBcImlucHV0W3R5cGU9dGV4dF1cIlxuICAgICAgICApLnZhbHVlO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChlLnRhcmdldC52YWx1ZSA9PT0gJ29uJykge1xuICAgICAgICBsZXQgZVRhcmdldCA9IGUudGFyZ2V0LnBhcmVudE5vZGVcbiAgICAgICAgZVRhcmdldC5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPWNoZWNrYm94XScpLnRvZ2dsZUF0dHJpYnV0ZSgnY2hlY2tlZCcpXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kb25lJykuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmVlbmQnLCBlVGFyZ2V0LmNsb25lTm9kZSh0cnVlKSkuY2xhc3NMaXN0LmFkZCgnZG9uZScpXG4gICAgICAgIGVUYXJnZXQucmVtb3ZlKCkgXG4gICAgfVxuICB9KTsgIFxufSlcblxuZnVuY3Rpb24gY3JlYXRlVGFzaygpIHtcbiAgbGV0IHRleHQgPSBpbnB1dC52YWx1ZTtcbiAgaWYgKGlucHV0LnZhbHVlID09PSBcIlwiKSB7XG4gICAgcmV0dXJuIGFsZXJ0KFwiTmVlZCBzb21lIHRhc2tcIik7XG4gIH0gZWxzZSB7XG4gICAgbGV0IG5ld0xpID0gYFxuICAgICAgICA8bGkgY2xhc3M9XCJtYWluX190b2RvX19saXN0LWl0ZW1cIj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIj5cbiAgICAgICAgICAgIDxsYWJlbD4ke3RleHR9PC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImVkaXRcIj5FZGl0PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZGVsZXRlXCI+RGVsZXRlPC9idXR0b24+XG4gICAgICAgIDwvbGk+XG4gICAgICAgIGA7XG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluX190b2RvX19saXN0JykuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIG5ld0xpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjbGVhcklucHV0KCkge1xuICBpbnB1dC52YWx1ZSA9IFwiXCI7XG4gIGlucHV0LmZvY3VzKCk7XG59XG4iXSwiZmlsZSI6ImFwcC5qcyJ9
