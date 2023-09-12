#!/usr/bin/node

output_section = document.querySelector(".output-section");
dialog = document.querySelector("dialog");
dialog_button = document.querySelector(".dialog-button");
new_book_button = document.querySelector(".new-book-button");
dialog_form = document.querySelector(".dialog-form")

new_book_button.addEventListener("click", () => {
  dialog.showModal();
})

dialog_button.addEventListener("click", (e) => {
  output_section.innerHTML = '';
  addBookToLibrary();
  e.preventDefault();
  dialog.close();
})

const myLibrary = [];

class Book {
  constructor(title, author, pages, already_read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.already_read = already_read

    this.info = function () {
      return {
        'title': title,
        'author': author,
        'pages': pages,
        'already_read': already_read,
      }
    }
  }
  type() {
    return 'Book'
  }
  applyData(json){
    Object.assign(this, json)
  }
}

function addBookToLibrary() {
  // take users input
  // store the new book object in array
  book = new Book()
  dialog_form.querySelectorAll('input').forEach(function(d_input){
    let value = d_input.value;
    if (value === 'on'){
      value = d_input.checked ? true : false;
    }
    book.applyData({[d_input.name]: value})
  })
  myLibrary.push(book);
    get_books()
}

function get_books() {
  myLibrary.forEach(function (book) {
    // display content on page
    const card = document.createElement('div');
    card.classList.add("card")
    for (const k of Object.keys(book.info())){
      const p = document.createElement('p');
      p.textContent = `${k}: ${book[k]}`;
      card.appendChild(p);
    }
    output_section.appendChild(card);
  });
}

book1 = new Book('123', '213', 123, true)
book2 = new Book('112323', '213123', 321, false)
myLibrary.push(book1)
myLibrary.push(book2)
get_books();