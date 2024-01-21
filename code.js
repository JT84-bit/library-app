
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

  this.info = function() {
    if(!hasRead){
      return (`${title} by ${author}, ${nroPages} pages, not read yet`)
    }else{
      return (`${title} by ${author}, ${nroPages} pages, have read`)
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
