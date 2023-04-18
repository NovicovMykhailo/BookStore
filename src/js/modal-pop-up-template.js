import amazon1x from '../images/BookStoreIcons/amazon.png';
import amazon2x from '../images/BookStoreIcons/amazon-2x.png';
import appleBooks1x from '../images/BookStoreIcons/apple-books.png';
import appleBooks2x from '../images/BookStoreIcons/apple-books-2x.png';
import bookshop1x from '../images/BookStoreIcons/book-shop.png';
import bookshop2x from '../images/BookStoreIcons/book-shop-2x.png';
import closeBtnIcon from '../images/svg-sprite.svg';

export let currentBookObj = []


export function createModalPopUpCard(book) {
  const { _id, title, author, book_image, description, buy_links } = book;
  currentBookObj = { _id, title, author, book_image, description, buy_links };
  

  const urls = buy_links
    .filter(buyLink =>
      ['Amazon', 'Apple Books', 'Bookshop'].includes(buyLink.name)
    )
    .map(buyLink => buyLink.url);
  return `<div id="modal" data-fancybox="modal" class="modal" style="display:none">
    <div class="modal__pop-up">
      <button class="pop-up__btn-close" type="button">
        <svg class="btn-close-icon" width="32" height="32">
          <use href="${closeBtnIcon}#x-close-icon"></use>
        </svg>
      </button>
      <div class="pop-up__book">
        <div class="pop-up__book-container">
          <img class="book__image" src="${book_image}" alt="" >
          <div>
            <div>
              <h2 class="book__title info-item__title">${title}</h2>
              <p class="book__author info-item__author">${author}</p>
            </div>
            <p class="book__description">${description}</p>
            <ul class="book__list">
              <li class="book__item">
                <a class="book__buy-links" href="${urls[0]}" target="_blank" rel="noopener noreferrer" aria-label="Amazon">
                  <picture class="buy-links__icon amazon">
                    <source srcset="${amazon1x} 1x, ${amazon2x} 2x">
                    <img src="${amazon2x}" alt="Amazon">
                  </picture>
                </a>
              </li>
              <li class="book__item">
                <a class="book__buy-links" href="${urls[1]}" target="_blank" rel="noopener noreferrer" aria-label="Apple Books">
                  <picture class="buy-links__icon">
                    <source
                      srcset="${appleBooks1x} 1x, ${appleBooks2x} 2x">
                    <img src="${appleBooks2x}" alt="Apple Books" data="${_id}">
                  </picture>
                </a>
              </li>
              <li class="book__item">
                <a class="book__buy-links" href="${urls[2]}" target="_blank" rel="noopener noreferrer" aria-label="Bookshop">
                  <picture class="buy-links__icon">
                    <source
                      srcset="${bookshop1x} 1x, ${bookshop2x} 2x">
                    <img src="${bookshop2x}" alt="Bookshop">
                  </picture>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <button class="pop-up__btn-add btn-default" type="button">add to shopping list</button>
      <button class="pop-up__btn-remove btn-default visually-hidden" type="button">remove from the shopping list</button>
      <p class="pop-up__text-info visually-hidden">Сongratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”.
      </p>
    </div>
  </div>
`;
}