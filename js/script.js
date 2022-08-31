document.addEventListener('DOMContentLoaded', function() {
    const submitForm = document.getElementById('inputBook');

    submitForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addBook();
    });
    
    if (isStorageExist()) {
        loadDataFromLocalStorage();
    }
});

document.addEventListener('ondatasaved', () => {
    console.log('Data Berhasil Disimpan!');
});

document.addEventListener('ondataloaded', () => {
    refreshDataFromBooks();
});
