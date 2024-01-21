
let loginForm = document.getElementById("loginForm");
let shelf = document.querySelector(".addedBooks")

const myLibrary = [];


// Takes info from form on "sumbit" and resets form
loginForm.addEventListener("submit", (e) => {
  e.preventDefault(); 

  let bookName = document.querySelector("#bookName");
  let authorName = document.querySelector("#authorName");
  let nroPages = document.querySelector("#nroPages");
  let readed = document.querySelector("#read");

  let read;
  if(readed.checked){
    read = true;
  }

  let book = bookName.value;
  let author = authorName.value;
  let pages = nroPages.value;

  addBookToLibrary(book, author, pages, read);

  loginForm.reset();

});

function Book (title, author, nroPages, hasRead) {
  this.title = title;
  this.author = author;
  this.nroPages = nroPages;
  this.hasRead = hasRead;

  this.read = function () {
    return this.hasRead
  };

  this.info = function() {
    if(!this.hasRead){
      return (`${title} by ${author}, ${nroPages} pages, not read yet`)
    }else{
      return (`${title} by ${author}, ${nroPages} pages, have been read`)
    }
  }
}; 

// Adds books to "Archives" and refreshes when removing
function populate(){

  while(shelf.firstChild){
    shelf.removeChild(shelf.lastChild);
  };

  for(let i = 0; i < myLibrary.length; i++){

    book = myLibrary[i];
    let newBook = book.info();
    const p = document.createElement("p");
    const button = document.createElement("button")
    button.textContent = "Remove"
    button.classList.add("remove");
    button.addEventListener("click", () => removeBookFromLibrary(i)); 
    text = document.createTextNode(newBook);
    p.appendChild(text);

    if(!book.read()){
      const button2 = document.createElement("button")
      button2.textContent = "Read"
      button2.classList.add("read");
      button2.addEventListener("click", () => changeReadStatus(i)); 
      p.appendChild(button2)
    }

    p.appendChild(button);
    shelf.appendChild(p);
  }
}

function addBookToLibrary(book, author, nroPages, hasRead){

  let book1 = new Book(book, author, nroPages, hasRead)
  myLibrary.push(book1);

  populate();
} 

function removeBookFromLibrary (index) {

  myLibrary.splice(index, 1)
  populate();
}

function changeReadStatus (index) {
  book = myLibrary[index];
  book.hasRead = true;
  populate();
}
