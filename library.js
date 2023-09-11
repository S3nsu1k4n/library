#!/usr/bin/node

output_section = document.querySelector(".output-section");
input_section = document.querySelector(".input-section");
dialog = document.querySelector("dialog");
dialog_button = document.querySelector(".dialog-button");
new_book_button = document.querySelector(".new-book-button");

new_book_button.addEventListener("click", () => {
  dialog.showModal();
})

dialog_button.addEventListener("click", () => {
  
  output_section.innerHTML = '';
  get_books();
  dialog.close();
})

const myLibrary = [];

class Book {
  constructor(title, author, no_pages, already_read) {
    this.title = title
    this.author = author
    this.no_pages = no_pages
    this.already_read = already_read

    this.info = function () {
      return {
        'title': title,
        'author': author,
        'no_pages': no_pages,
        'already_read': already_read,
      }
    }
  }
  type() {
    return 'Book'
  }
}

function addBookToLibrary(book) {
  // take users input
  // store the new book object in array

  myLibrary.push(book);
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
    console.log(book)
  });
}


const book1 = new Book('some title', 'famous author', 254, false);
const book2 = new Book('some title2', 'famous author2', 234, true);
console.log(book1.info());
console.log(book1.type());
console.log(book2.valueOf());

console.log(Object.getPrototypeOf(book1) == Book.prototype);

addBookToLibrary(book1);
addBookToLibrary(book2);

get_books();