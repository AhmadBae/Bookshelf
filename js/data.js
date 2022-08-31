const STORAGE_KEY = 'BOOK_APPS';

let books = [];

function isStorageExist() {
    if (typeof(Storage) === undefined) {
        alert('Browser anda tidak mendukung local storage!');
        return false;
    }

    return true;
}

function saveDataToStorage() {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);

    document.dispatchEvent(new Event('ondatasaved'));
}

function loadDataFromLocalStorage() {
    const getData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(getData);

    if (data !== null) {
        books = data;
    }
    
    document.dispatchEvent(new Event('ondataloaded'));
}

function updateDataToStorage() {  
    if(isStorageExist) {
        saveDataToStorage();
    }
}

function composeBookObject(title, author, year, isCompleted) {
    return {
        id: +new Date(),
        title,
        author,
        year,
        isCompleted,
    };
}

function findBook(bookId) {  
    for (book of books) {
        if (book.id === bookId) {
            return book;
        }
    }

    return null;
}

function findBookIndex(bookId) {
    let index = 0;
    for (book of books) {
        if(book.id === bookId) {
            return index;
        }

        index++;
    }

    return -1;
}