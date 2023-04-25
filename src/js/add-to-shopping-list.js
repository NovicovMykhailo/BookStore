
const arrayOfId = [];
 
export  function addToLocalStorage(bookObject) {
 

  if (checkBookTitle(bookObject.title)) {

    return;
  } else if (!checkBookTitle(bookObject.title)) {
    arrayOfId.push(bookObject);
    localStorage.setItem('shopping-list', JSON.stringify(arrayOfId));
    return false;
  }

}

export function checkBookTitle(bookTitle) {
  // console.log(books)


    const storedBooks = JSON.parse(localStorage.getItem('shopping-list'));
    if (storedBooks.some(book => book.title === bookTitle)) {
      // Если название книги найдено в массиве объектов
      return true;
    } else {
      // Если название книги не найдено в массиве объектов
      return false;
    }

}

