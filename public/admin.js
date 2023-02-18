async function main() {
  let response = await fetch("http://localhost:3001/listBooks");
  let books = await response.json();

  books.forEach(renderBook);
}

function renderBook(book) {
  let root = document.getElementById("root");
  let listItem = document.createElement("li");
  let qtyInput = document.createElement("input");
  let submit = document.createElement("button");

  listItem.textContent = book.title;
  qtyInput.setAttribute("value", `${book.quantity}`);
  submit.textContent = "Save";

  submit.addEventListener("click", () => {
    fetch("http://localhost:3001/updateBook", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: book.id,
        quantity: qtyInput.value,
      }),
    });
  });

  listItem.append(qtyInput, submit);
  root.append(listItem);
}

main();
