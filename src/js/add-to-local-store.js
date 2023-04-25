import Notiflix from 'notiflix';
const notifyOptions = {
  fontFamily: 'DMSans',

};
import { books } from './shopping-list__books';
export default function addToLocalStorage(bookObject) {
  try {
    const arrayOfId = [];

    books.map(book => arrayOfId.push(book._id));

    if (!arrayOfId.includes(bookObject._id) || books.length === 0) {
      books.unshift(bookObject);
      localStorage.setItem('shopping-list', JSON.stringify(books));
    }

    if (arrayOfId.includes(bookObject._id)) {
      Notiflix.Notify.info('You already have this Book', notifyOptions);

    }
  } catch (error) {
     Notiflix.Notify.failure('You already have this Book', notifyOptions);
    // console.log(error);
  }
}
