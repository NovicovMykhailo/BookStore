import { BookAPI } from './book-api.js';

import {
  createModalPopUpCard,
  currentBookObj,
} from './modal-pop-up-template.js';

// Import Database
import { useFirebase } from './firebase.js';
const firebase = new useFirebase();

// FancyBox Import
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
// Fancybox Options
const fancyBoxOptions = {
  on: {
    ready: () => {
      closeModal();
      // Andrew Add start
      addLocal(); //
      removeLocal();
    },
    close: () => {
      setTimeout(deleteMarkup, 500);
    },
  },
  autoFocus: false,
};
import Notiflix from 'notiflix';
// Notify Options
const notifyOptions = {
  fontFamily: 'DMSans',
  zindex: 10001,
  clickToClose: true,
  position: 'center-top',
};

// Book Api Init
const bookAPI = new BookAPI();
// Cards container select
let bookCards = document.querySelectorAll('.gallery_container');
// listening clicks on card
bookCards.forEach(item => item.addEventListener('click', onCardClick));
// refs
function refsEls() {
  return {
    btnToggleAddEl: document.querySelector('.pop-up__btn-add'),
    btnToggleRemoveEl: document.querySelector('.pop-up__btn-remove'),
    textToggleRemoveEl: document.querySelector('.pop-up__text-info'),
  };
}
// function on click
function onCardClick(e) {
  e.preventDefault();

  if (
    e.target.className === 'book-card__image' ||
    e.target.className === 'info-item__title' ||
    e.target.className === 'info-item__author' ||
    e.target.className === 'book-card__notification'
  ) {
    const bookId = e.target.parentElement.parentNode.children[0].children[2].innerText;

    bookAPI.id = bookId;
    bookAPI.getBookInfo().then(response => {
      const book = response.data;

      const modalPopUp = createModalPopUpCard(book);

      document.body.insertAdjacentHTML('beforeend', modalPopUp);

      Fancybox.show([{ src: '#modal', type: 'inline' }], fancyBoxOptions);

      // проверка для кнопки
      const refs = refsEls();
      // проверка на наличие в списка
      if (localStorage.getItem('register') && localStorage.getItem('shopping-list')) {
        let bookFound = checkBookTitle(book.title);
        if (bookFound) {
          console.log(true);
          refs.btnToggleAddEl.classList.add('visually-hidden');
          refs.btnToggleRemoveEl.classList.remove('visually-hidden');
          refs.textToggleRemoveEl.classList.remove('visually-hidden');
        } else if (!bookFound) {
          refs.btnToggleAddEl.classList.remove('visually-hidden');
          refs.btnToggleRemoveEl.classList.add('visually-hidden');
          refs.textToggleRemoveEl.classList.add('visually-hidden');
        }
      }

      // find Fancybox-close-btn
      const facyCloseBtn = document.querySelector('.f-button.is-close-btn');
      // find modal close btn
      const modalCloseBtn = document.querySelector('.pop-up__btn-close');
      // adding a description if there is none
      const bookDescription = document.querySelector('.book__description');
      if (bookDescription.textContent.trim() === '') {
        bookDescription.textContent = 'There is currently no description available for this book';
      }
    });
  }
  return;
}
// funcybox custom close button
function closeModal() {
  const modalCloseBtn = document.querySelector('.pop-up__btn-close');
  modalCloseBtn.addEventListener('click', e => {
    if (e.target.localName === 'use' || e.target.localName === 'svg') {
      Fancybox.close();
    }
  });
}
// Andrew Add start

function addLocal() {
  const refs = refsEls();

  refs.btnToggleAddEl.addEventListener('click', event => {
    event.preventDefault();
    // use firebase
    if (
      localStorage.getItem('register') &&
      localStorage.getItem('shopping-list')
    ) {
      firebase.writeBookArrayToDB(currentBookObj);
      refs.btnToggleAddEl.classList.add('visually-hidden');
      refs.btnToggleRemoveEl.classList.remove('visually-hidden');
      refs.textToggleRemoveEl.classList.remove('visually-hidden');
      return;
    }
    Notiflix.Notify.info(
      ' You may be registered to use this option',
      notifyOptions
    );
  });
}

function removeLocal() {
  const btnToggleAddEl = document.querySelector('.pop-up__btn-add');
  const btnToggleRemoveEl = document.querySelector('.pop-up__btn-remove');
  const textToggleRemoveEl = document.querySelector('.pop-up__text-info');
  btnToggleRemoveEl.addEventListener('click', event => {
    event.preventDefault();
    //   use firebase
    firebase.selectBookFromArray(currentBookObj._id);
    btnToggleAddEl.classList.remove('visually-hidden');
    btnToggleRemoveEl.classList.add('visually-hidden');
    textToggleRemoveEl.classList.add('visually-hidden');
  });
}
// Andrew Add end
function deleteMarkup() {
  const el = document.querySelector('#modal');
  el.parentElement.removeChild(el);
}

// check for exsisting
export function checkBookTitle(bookTitle) {
  const refs = refsEls();

  const storedBooks = JSON.parse(localStorage.getItem('shopping-list'));
  if (storedBooks.some(book => book.title === bookTitle)) {
    // Если название книги найдено в массиве объектов
    return true;
  } else {
    // Если название книги не найдено в массиве объектов
    return false;
  }
}
