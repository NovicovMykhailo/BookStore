import { books } from './shopping-list__books';
export default function addToLocalStorage(bookObject) {
  try {
    const arrayOfId = [];

    console.log('books', books);
    books.map(book => arrayOfId.push(book._id));

    console.log('arrayOfId: ', arrayOfId);
    console.log('books.length', books.length);

    if (!arrayOfId.includes(bookObject._id) || books.length === 0) {
      books.unshift(bookObject);
      localStorage.setItem('shopping-list', JSON.stringify(books));
    }

    if (arrayOfId.includes(bookObject._id)) {
      console.log('You already have this Book'); // можно сделать на нттифашку, а можно ставить кнопки в зависимост от того есть ли эта книга в локал
    }
  } catch (error) {
    console.log(error);
  }
}
