const unreadBookField = 'incompleteBookshelfList';
const readedBookField = 'completeBookshelfList';
const BOOK_ITEMID = "itemId";


const addBook = () => {
    const title = document.getElementById('inputBookTitle').value;
    const author = document.getElementById('inputBookAuthor').value;
    const year = document.getElementById('inputBookYear').value;
    const checkBox = document.getElementById('inputBookIsComplete').checked;

    const makeRack = rackBook(title, author, year, checkBox);
    const bookObject = composeBookObject(title, author, year, checkBox);

    makeRack[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);

    updateDataToStorage();

    console.log(title, author, year)
}

const rackBook = (title, author, year, isCompleted) => {
    const judul = document.createElement('h3');
    judul.innerHTML = `Judul : <span>${title}</span>`;

    const namapenulis = document.createElement('p');
    namapenulis.innerHTML = `Penulis: <span>${author}</span>`;

    const tahun = document.createElement('p');
    tahun.innerHTML = `Tahun : <span>${year}</span>`;

    const bookContainer = document.createElement('article');
    bookContainer.classList.add('book_item');

    const Acontainer = document.createElement('div');
    Acontainer.classList.add('action');

    bookContainer.append(judul, namapenulis, tahun, Acontainer);

    if (isCompleted) {
        const listCompletedRead = document.getElementById(readedBookField);
        listCompletedRead.append(bookContainer);
        Acontainer.append(createInclompleteButton(), createDeleteButton());
    } else {
        const listIncompletedRead = document.getElementById(unreadBookField);
        listIncompletedRead.append(bookContainer)
        Acontainer.append(createCompleteButton(), createDeleteButton());
    }

    return bookContainer
}

const createDefaultButton = (buttonTypeClass, text, eventListener) => {
    const button = document.createElement('button');
    button.innerText = text;
    button.classList.add(buttonTypeClass);

    button.addEventListener('click', function (event) {
        eventListener(event);
    });

    return button;
}

const createCompleteButton = () => {
    return createDefaultButton('green', 'Selesai dibaca', function (event) {
        addBookToCompleted(event.target.parentElement.parentElement);
    });
}

const createInclompleteButton = () => {
    return createDefaultButton('green', 'Belum Selesai', function (event) {
        addBookToInComplited(event.target.parentElement.parentElement);
    });
}

const createDeleteButton = () => {
    return createDefaultButton('red', 'delete', function (event) {
        removeBookFromList(event.target.parentElement.parentElement);
    });
}

const removeBookFromList = (bookElement) => {
    const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);
    const confirmDelete = confirm('Kamu yakin?');
    if (confirmDelete === true) {
        bookElement.remove();
        updateDataToStorage();
    } else {
        return;
    }
}

const addBookToCompleted = (bookElement) => {
    const listCompleted = document.getElementById(readedBookField);
    const bookTitle = bookElement.querySelector(".book_item > h3 > span").innerText;
    const bookAuthor = bookElement.querySelectorAll(".book_item > p > span")[0].innerText;
    const bookYear = bookElement.querySelectorAll('.book_item > p > span')[1].innerText;

    const completedRead = rackBook(bookTitle, bookAuthor, bookYear, true);
    const book = findBook(bookElement[BOOK_ITEMID]);

    book.isCompleted = true;
    completedRead[BOOK_ITEMID] = book.id;

    listCompleted.append(completedRead);
    bookElement.remove();

    updateDataToStorage();

}

const addBookToInComplited = (bookElement) => {
    const listIncompletedRead = document.getElementById(unreadBookField);
    const bookTitle = bookElement.querySelector(".book_item > h3 > span").innerText;
    const bookAuthor = bookElement.querySelectorAll(".book_item > p > span")[0].innerText;
    const bookYear = bookElement.querySelectorAll('.book_item > p > span')[1].innerText;

    const newBook = rackBook(bookTitle, bookAuthor, bookYear, false);
    const book = findBook(bookElement[BOOK_ITEMID]);

    book.isCompleted = false;

    newBook[BOOK_ITEMID] = book.id;

    listIncompletedRead.append(newBook);
    bookElement.remove();

    updateDataToStorage();
} 

function refreshDataFromBooks() {
    const listIncompletedRead = document.getElementById(unreadBookField);
    const listCompletedRead = document.getElementById(readedBookField);

    for (book of books) {
        const newBook = rackBook(book.title, book.author, book.year, book.isCompleted);
        newBook[BOOK_ITEMID] = book.id;

        if (book.isCompleted) {
            listCompletedRead.append(newBook);
        } else {
            listIncompletedRead.append(newBook);
        }
    }
}