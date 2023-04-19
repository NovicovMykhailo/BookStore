import { books } from './shopping-list__books';
export default function removeFromLocalStorage(bookId) {
  try {
    books.map((b, i) => {
      if (b.title === bookId.title) {
        books.splice(i, 1);
        localStorage.setItem('shopping-list', JSON.stringify(books));
        return;
      }    
    }
    );
  } catch (error) {
    console.log(error);
  }
}
