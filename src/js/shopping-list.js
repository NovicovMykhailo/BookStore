import addToLocalStorage from './add-to-shopping-list';
import removeFromLocalStorage from './remove-from-shopping-list';
import { renderPaginationBtn, currentPage } from '../js/shopping-list__pagination';
// import renderPaginationBtn from '../js/shopping-list__pagination';
import { paginationBtnEl } from '../js/shopping-list__pagination';
import { books } from './shopping-list__books';

import amazon1x from '../images/BookStoreIcons/amazon.png';
import amazon2x from '../images/BookStoreIcons/amazon-2x.png';
import appleBooks1x from '../images/BookStoreIcons/apple-books.png';
import appleBooks2x from '../images/BookStoreIcons/apple-books-2x.png';
import bookshop1x from '../images/BookStoreIcons/book-shop.png';
import bookshop2x from '../images/BookStoreIcons/book-shop-2x.png';
import spriteSvgEls from '../images/svg-sprite.svg';


const addBookBtnEl = document.querySelector('[data-add]');
const supUkrContainerEl = document.querySelector('.support-ukraine');
const ulEl = document.querySelector('.check');
export const shoppingListSectionEl = document.querySelector('.shopping-list__page');
const shoppingListContainer = shoppingListSectionEl.parentNode;
// const paginationBtnEl = document.querySelector('.btn-pagination__list');
// import const paginationBtnEl = document.querySelector('.btn-pagination__list');



const getListObjectsOfPage = numberPage => {
  let indexOfStart = (numberPage * 3) - 3;
  const arrayOfBooks = [];

  for (let i = indexOfStart; i < indexOfStart + 3; i += 1){
    console.log('i: ', i);
    arrayOfBooks.push(books[i]);
  }

  return arrayOfBooks;
}

const isAvailableDescription = (description) => {
  if (description === '') {
    return "Sorry, we can't find appropriate description :("
  }

  return description;
}


//================================
// const oldMurkupPictures = `<li>
// <div class="shopping-list__card">
//   <img src="${book_image}" alt="book cover" class='shopping-list__image' />
//   <div class="shopping-list__head-part">
//     <h2 class='shopping-list__title-card'>${title}</h2>
//       <p class="shopping-list__sub-title">Sub-title</p>
//       <p class="shopping-list__description">${isAvailableDescription(description)}
//       </p>
//       <div class='shopping-list__card-container'>
//         <h3 class='shopping-list__author'>${author}</h3>
//         <ul class="shopping-list__links">
//           <li class="shopping-list__link-item">
//               <a href="${buy_links[0].url}" class="shopping-list__link" target='blank'>
//                   <img src="../images/BookStoreIcons/amazon.png" width="48" alt="platform-icon" class="shopping-list__link-icon">
//               </a>
//           </li>
//           <li class="shopping-list__link-item">
//               <a href="${buy_links[1].url}" class="shopping-list__link" target='blank'>
//                   <img src="../images/BookStoreIcons/apple-books.png" width="28" alt="platform-icon" class="shopping-list__link-icon">
//               </a>
//           </li>
//           <li class="shopping-list__link-item">
//               <a href="${buy_links[4].url}" class="shopping-list__link" target='blank'>
//                   <img src="../images/BookStoreIcons/book-shop.png" width="32" alt="platform-icon" class="shopping-list__link-icon">
//               </a>
//           </li>
//         </ul>
//       </div>
//   </div>
//   <button class="btn">
//     <svg class="trash-icon" width="16" height="16">
//       <use href="${spriteSvgEls}#trash-icon"></use>
//     </svg>
//   </button>
// </div>
// </li>`;
// ==========================================

const murkupForTabketAndDesktop = ({ author, title, book_image, buy_links, description }) => `<li>
<div class="shopping-list__card">
  <img src="${book_image}" alt="book cover" class='shopping-list__image' />
  <div class="shopping-list__head-part">
    <h2 class='shopping-list__title-card'>${title}</h2>
      <p class="shopping-list__sub-title">Sub-title</p>
      <p class="shopping-list__description">${isAvailableDescription(description)}
      </p>
      <div class='shopping-list__card-container'>
        <h3 class='shopping-list__author'>${author}</h3>
        <ul class="shopping-list__links">
          <li class="shopping-list__link-item">
              <a href="${buy_links[0].url}" class="shopping-list__link" target='blank'>
                  <img class="buy-links__icon" src="${amazon1x}" width="48" alt="platform-icon" class="shopping-list__link-icon">
              </a>
          </li>
          <li class="shopping-list__link-item">
              <a href="${buy_links[1].url}" class="shopping-list__link" target='blank'>
                  <img class="buy-links__icon" src="${appleBooks1x}" width="28" alt="platform-icon" class="shopping-list__link-icon">
              </a>
          </li>
          <li class="shopping-list__link-item">
              <a href="${buy_links[4].url}" class="shopping-list__link" target='blank'>
                  <img class="buy-links__icon" src="${bookshop1x}" width="32" alt="platform-icon" class="shopping-list__link-icon">
              </a>
          </li>
        </ul>
      </div>
  </div>
  <button class="btn">
    <svg class="trash-icon" width="16" height="16">
      <use href="${spriteSvgEls}#trash-icon"></use>
    </svg>
  </button>
</div>
</li>`;

// const newM =  `<li>
// <div class="shopping-list__card">
//   <img src="${book_image}" alt="book cover" class='shopping-list__image' />
//   <div class="shopping-list__head-part">
//     <h2 class='shopping-list__title-card'>${title}</h2>
//       <p class="shopping-list__sub-title">Sub-title</p>
//       <p class="shopping-list__description">${isAvailableDescription(description)}
//       </p>
//       <div class='shopping-list__card-container'>
//         <h3 class='shopping-list__author'>${author}</h3>
//         <ul class="shopping-list__links">
//           <li class="shopping-list__link-item">
//             <a href="${buy_links[0].url}" target="_blank" rel="noopener noreferrer" aria-label="Amazon">
//               <picture>
//                 <source srcset="${amazon1x} 1x, ${amazon2x} 2x">
//                 <img src="${amazon2x}" alt="Amazon">
//               </picture>
//             </a>
//           </li>
//           <li class="shopping-list__link-item">
//             <a href="${buy_links[1].url}" target="_blank" rel="noopener noreferrer" aria-label="Apple Books">
//               <picture>
//                <source
//                   srcset="${appleBooks1x} 1x, ${appleBooks2x} 2x">
//                 <img src="${appleBooks2x}" alt="Apple Books" data="${_id}">
//               </picture>
//             </a>
//           </li>
//           <li class="shopping-list__link-item">
//             <a href="${buy_links[4].url}" target="_blank" rel="noopener noreferrer" aria-label="Bookshop">
//               <picture>
//                 <source
//                   srcset="${bookshop1x} 1x, ${bookshop2x} 2x">
//                 <img src="${bookshop2x}" alt="Bookshop">
//               </picture>
//             </a>
//           </li>
//         </ul>
//       </div>
//   </div>
//   <button class="btn">
//     <svg class="trash-icon" width="16" height="16">
//       <use href="${spriteSvgEls}#trash-icon"></use>
//     </svg>
//   </button>
// </div>
// </li>`;


const murkupForMobile = ({ author, title, book_image, buy_links, description }) => `<li>
<div class="shopping-list__card">
  <div class="shopping-list__sub-card">
    <div class="shopping-list__haed-part__mobile">
      <img src="${book_image}" alt="book cover" class="shopping-list__image">
    </div>
    <div>
      <h2 class="shopping-list__title-card">${title}</h2>
      <p class="shopping-list__sub-title">Sub-title</p>
      <ul class="shopping-list__links">
        <li class="shopping-list__link-item">
          <a href="${buy_links[0].url}" target="_blank" rel="noopener noreferrer" aria-label="Amazon">
            <picture>
              <source srcset="${amazon1x} 1x, ${amazon2x} 2x">
              <img src="${amazon2x}" alt="Amazon">
            </picture>
          </a>
        </li>
        <li class="shopping-list__link-item">
          <a href="${buy_links[1].url}" target="_blank" rel="noopener noreferrer" aria-label="Apple Books">
            <picture>
             <source
                srcset="${appleBooks1x} 1x, ${appleBooks2x} 2x">
              <img src="${appleBooks2x}" alt="Apple Books" data="${_id}">
            </picture>
          </a>
        </li>
        <li class="shopping-list__link-item">
          <a href="${buy_links[4].url}" target="_blank" rel="noopener noreferrer" aria-label="Bookshop">
            <picture>
              <source
                srcset="${bookshop1x} 1x, ${bookshop2x} 2x">
              <img src="${bookshop2x}" alt="Bookshop">
            </picture>
          </a>
        </li>
      </ul>
    </div>
  </div>
  <p class="shopping-list__author">${author}</p>
  <p class="shopping-list__description">${isAvailableDescription(description)}</p>
  <button class="btn">
    <svg class="trash-icon" width="16" height="16">
      <use href="${spriteSvgEls}#trash-icon"></use>
    </svg>
  </button>
</div>
</li>`;

const getAppropriateMurkup = (book) => {
  if (window.screen.width < 768) {
    return murkupForMobile(book); // !!! может быть ошибка с передачей строки
  }

  return murkupForTabketAndDesktop(book);
}

export const murkupShoppingList = numberPage => {
  const arrayOfMurkup = [];
  getListObjectsOfPage(numberPage).map(book => {

    arrayOfMurkup.push(getAppropriateMurkup(book))
  })
  // return `<ul class="check shopping-list">${arrayOfMurkup.join('')}</ul>`;

  return arrayOfMurkup.join('');

}



const checkCountOfPages = () => {
  return Math.ceil(books.length / 3);
};

export const mainRenderingFunc = () => {
  if (window.screen.width >= 1440) {
    supUkrContainerEl.innerHTML = `<h2 class="support-ukraine__title">
    <span class="support-title-container">
      Support Ukraine
      <svg class="logo-ukr" width="20" height="32">
        <use href="../images/svg-sprite.svg#ukraine-arms"></use>
      </svg>
    </span>
  </h2>
  <ul class="support-companies"></ul>
  <button type="button" class="support__load-more">
    <svg class="button__icon" width="64" height="64">
      <use href="../images/svg-sprite.svg#arrow-down-icon"></use>
    </svg>
  </button>`;
  //   shoppingListContainer.insertAdjacentHTML('afterbegin', `<section class="support-ukraine">
  //   <h2 class="support-ukraine__title">
  //     <span class="support-title-container">
  //       Support Ukraine
  //       <svg class="logo-ukr" width="20" height="32">
  //         <use href="../images/svg-sprite.svg#ukraine-arms"></use>
  //       </svg>
  //     </span>
  //   </h2>
  //   <ul class="support-companies"></ul>
  //   <button type="button" class="support__load-more">
  //     <svg class="button__icon" width="64" height="64">
  //       <use href="../images/svg-sprite.svg#arrow-down-icon"></use>
  //     </svg>
  //   </button>
  // </section>`);
  }
  if (checkCountOfPages() === 0) {
    shoppingListSectionEl.insertAdjacentHTML(
      'beforeend',
      '<div class="empty-bookshelf"><p class="empty-bookshelf__text">This page is empty, add some books and proceed to order.</p><div class="empty-bookshelf__image"></div></div>'
    );
    const bookShelfImgEl = document.querySelector('.empty-bookshelf__image');
    bookShelfImgEl.classList.add('shopping-list__page-empty');

    return;
  }
  
  console.log('books.length', books.length);
  ulEl.innerHTML = murkupShoppingList(currentPage);
  renderPaginationBtn();
}

try {

  console.log('Let`s go');
  mainRenderingFunc();

} catch (error) {
  console.log(error);
}


