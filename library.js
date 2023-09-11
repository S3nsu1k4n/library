#!/usr/bin/node

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


const book1 = new Book('some title', 'famous author', 254, false)
const book2 = new Book('some title2', 'famous author2', 234, true)
console.log(book1.info())
console.log(book1.type())
console.log(book2.valueOf())

console.log(Object.getPrototypeOf(book1) == Book.prototype)