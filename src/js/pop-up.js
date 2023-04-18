import { BookAPI } from './book-api.js';
import { createModalPopUpCard, currentBookObj} from './modal-pop-up-template.js';
// FancyBox Import
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
// Fancybox Options
const fancyBoxOptions = {
  on: {
    ready: () => {
      closeModal();
    },

    close: () => {
      setTimeout(deleteMarkup, 1000);
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

// function on click
function onCardClick(e) {
  e.preventDefault();
  if (e.target.className === 'book-card__image') {
    // console.log('Book Id =>', e.target.parentNode.children[2].innerText);
    const bookId = e.target.parentNode.children[2].innerText;

    bookAPI.id = bookId;

    bookAPI.getBookInfo().then(response => {
      const book = response.data;
      const modalPopUp = createModalPopUpCard(book);
      // console.log(currentBookObj)
      document.body.insertAdjacentHTML('beforeend', modalPopUp);

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

function deleteMarkup() {
  const el = document.querySelector('#modal');
  el.parentElement.removeChild(el);
}
