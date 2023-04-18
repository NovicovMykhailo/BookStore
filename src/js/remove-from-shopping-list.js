import { books } from './shopping-list__books';
export default function removeFromLocalStorage(bookId) {
  try {
    const arrayOfId = [];
    books.map(book => arrayOfId.push(book.id));

    books.splice(books[arrayOfId.indexOf(bookId)], 1);
    localStorage.setItem('shopping-list', JSON.stringify(books));
  } catch (error) {
    console.log(error);
  }
}
