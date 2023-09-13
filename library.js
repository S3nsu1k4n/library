#!/usr/bin/node

output_section = document.querySelector(".output-section");
dialog = document.querySelector("dialog");
dialog_button = document.querySelector(".dialog-button");
new_book_button = document.querySelector(".new-book-button");
dialog_form = document.querySelector(".dialog-form")

new_book_button.addEventListener("click", () => {
  dialog.showModal();
  console.log(myLibrary);
})

dialog_button.addEventListener("click", (e) => {
  addBookToLibrary();
  e.preventDefault();
  dialog.close();
})

const myLibrary = [];

let index = 1
class Book {
  constructor(title, author, pages, already_read) {
    this.index = index++
    this.title = title
    this.author = author
    this.pages = pages
    this.already_read = already_read
    console.log(this.index)
    this.info = function () {
      return {
        'title': title,
        'author': author,
        'pages': pages,
        'already_read': already_read,
      }
    }
    this.toggle_read = function(){
      this.already_read = !this.already_read;
      return this.already_read;
    }
  }
  type() {
    return 'Book'
  }
  applyData(json){
    Object.assign(this, json)
  }
}

function get_form_data(){
  json = {}
  dialog_form.querySelectorAll('input').forEach(function(d_input){
    let value = d_input.value;
    if (value === 'on'){
      value = d_input.checked ? true : false;
    }
    Object.assign(json, {[d_input.name]: value});
  })
  return json;
}

function create_book(json){
  return new Book(json.title, json.author, json.pages, json.already_read);
}

function create_card(book){
  const card = document.createElement('div');
  card.classList.add("card");
  card.classList.add(`card_id_${book.index}`);
  for (const k of Object.keys(book.info())){
    const p = document.createElement('p');
    p.textContent = `${k}: ${book[k]}`;
    p.classList.add([k]);
    card.appendChild(p);
  }
  card.appendChild(create_remove_button(book));
  card.appendChild(create_read_toggle_button(book));
  return card;
}

function create_remove_button(book){
  remove_button = document.createElement('button');
  remove_button.innerHTML = 'Remove';
  remove_button.addEventListener("click", (e) => {
    let button = e.target;
    let card = button.parentNode;
    card.remove();
    remove_from_library_array(book.index);
  })
  return remove_button;
}

function create_read_toggle_button(book){
  toggle_button = document.createElement('button');
  toggle_button.innerHTML = 'Read'
  toggle_button.addEventListener('click', (e) => {
    let button = e.target;
    let card = button.parentNode;
    input = card.querySelector('.already_read');
    console.log(input)
    book.toggle_read();
    input.value = input.innerHTML = `already_read: ${book.already_read}`;
  })
  return toggle_button;
}

function remove_from_library_array(index){
  for (let i=0; i<myLibrary.length; i++){
    if (myLibrary[i].index === index){
      myLibrary.splice(i, 1);
      break;
    } 
  }
}

function addBookToLibrary() {
  book = create_book(get_form_data());
  myLibrary.push(book);
  output_section.appendChild(create_card(book));
}
