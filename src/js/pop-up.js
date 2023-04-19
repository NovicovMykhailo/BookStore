import { BookAPI } from './book-api.js';
import {
  createModalPopUpCard,
  currentBookObj,
} from './modal-pop-up-template.js';
// Andrew Add start
import { addToLocalStorage, checkBookTitle } from './add-to-shopping-list.js';
import removeFromLocalStorage from './remove-from-shopping-list.js';
// Andrew Add end
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
      // Andrew Add end
    },
    close: () => {
      setTimeout(deleteMarkup, 500);
    },
  },
  autoFocus: false,
  // ClickAction | ((any?: any) => ClickAction | void)
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
};
// function on click
function onCardClick(e) {

  e.preventDefault();
  if (e.target.className === 'book-card__image') {
    const bookId = e.target.parentNode.children[2].innerText;
    bookAPI.id = bookId;
    bookAPI.getBookInfo().then(response => {
      const book = response.data;

      const modalPopUp = createModalPopUpCard(book);

      document.body.insertAdjacentHTML('beforeend', modalPopUp);

      // проверка для кнопки
        const refs = refsEls();

      if (checkBookTitle(book.title)) {
        refs.btnToggleAddEl.classList.add('visually-hidden');
        refs.btnToggleRemoveEl.classList.remove('visually-hidden');
        refs.textToggleRemoveEl.classList.remove('visually-hidden');
      } else if (!checkBookTitle(book.title)){
        refs.btnToggleAddEl.classList.remove('visually-hidden');
        refs.btnToggleRemoveEl.classList.add('visually-hidden');
        refs.textToggleRemoveEl.classList.add('visually-hidden');
      }
      

      Fancybox.show([{ src: '#modal', type: 'inline' }], fancyBoxOptions);
      // find Fancybox-close-btn
      const facyCloseBtn = document.querySelector('.f-button.is-close-btn');
      // find modal close btn
      const modalCloseBtn = document.querySelector('.pop-up__btn-close');
      // adding a description if there is none
      const bookDescription = document.querySelector('.book__description');
      if (bookDescription.textContent.trim() === '') {
        bookDescription.textContent =
          'There is currently no description available for this book';
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
    addToLocalStorage(currentBookObj);
    refs.btnToggleAddEl.classList.add('visually-hidden');
    refs.btnToggleRemoveEl.classList.remove('visually-hidden');
    refs.textToggleRemoveEl.classList.remove('visually-hidden');
  });
}

function removeLocal() {
  const btnToggleAddEl = document.querySelector('.pop-up__btn-add');
  const btnToggleRemoveEl = document.querySelector('.pop-up__btn-remove');
  const textToggleRemoveEl = document.querySelector('.pop-up__text-info');
  btnToggleRemoveEl.addEventListener('click', event => {
    event.preventDefault();

    removeFromLocalStorage(currentBookObj);
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
