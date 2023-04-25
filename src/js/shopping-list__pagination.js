import { books } from './shopping-list__books';
import {
  shoppingListSectionEl,
  murkupShoppingList,
  mainRenderingFunc,
} from './shopping-list';
import { numericBtnFunc } from './numeric-buttons__pagination';
import spriteSvgEls from '../images/svg-sprite.svg';

export const paginationBtnEl = document.querySelector('.btn-pagination__list');
const numericBtnEl = document.querySelector('.btn-pagination__numeric-list');
const liofNumbersEl = document.querySelector('.btn-paggination__numbers');


export const countPages = Math.ceil(books.length / 3);
export let currentPage = 1;

toAddCurrentClass = num => {
  const numberedNum = Number(num);
  if (num === '...') {
    return;
  }

  if (numberedNum === currentPage) {
    return 'btn-current';
  }
};

const mobileRendering = array => {
  if (array.length === 2) {
    return `<ul class="btn-pagination__numeric-list">
    <li><button class="btn-pagination__numeric ${toAddCurrentClass(array[0])}">
      <span class="text-numeric">${array[0]}</span>
    </button></li>
    <li><button class="btn-pagination__numeric ${toAddCurrentClass(array[1])}">
      <span class="text-numeric">${array[1]}</span>
    </button></li>
    </ul>`;
  }
  return `<ul class="btn-pagination__numeric-list">
    <li><button class="btn-pagination__numeric btn-current ${toAddCurrentClass(
      array[0]
    )}">
      <span class="text-numeric">${array[0]}</span>
    </button></li>
    <li><button class="btn-pagination__numeric ${toAddCurrentClass(array[1])}">
      <span class="text-numeric">${array[1]}</span>
    </button></li>
    <li><button class="btn-pagination__numeric ${toAddCurrentClass(array[2])}">
      <span class="text-numeric">${array[2]}</span>
    </button></li>
    </ul>`;
};

const tabletAndDesktopRendering = array => {
  if (array.length === 2) {
    return `<ul class="btn-pagination__numeric-list">
    <li><button class="btn-pagination__numeric ${toAddCurrentClass(array[0])}">
      <span class="text-numeric">${array[0]}</span>
    </button></li>
    <li><button class="btn-pagination__numeric ${toAddCurrentClass(array[1])}">
      <span class="text-numeric">${array[1]}</span>
    </button></li>
    </ul>`;
  }

  if (array.length === 3) {
    return `<ul class="btn-pagination__numeric-list">
    <li><button class="btn-pagination__numeric ${toAddCurrentClass(array[0])}">
      <span class="text-numeric">${array[0]}</span>
    </button></li>
    <li><button class="btn-pagination__numeric ${toAddCurrentClass(array[1])}">
      <span class="text-numeric">${array[1]}</span>
    </button></li>
    <li><button class="btn-pagination__numeric ${toAddCurrentClass(array[2])}">
      <span class="text-numeric">${array[2]}</span>
    </button></li>
    </ul>`;
  }

  //const indexOfCurrent = array.indexof(String(currentPage));// это чтобы както передать класс current
  return `<ul class="btn-pagination__numeric-list">
    <li><button class="btn-pagination__numeric ${toAddCurrentClass(array[0])}">
      <span class="text-numeric">${array[0]}</span>
    </button></li>
    <li><button class="btn-pagination__numeric ${toAddCurrentClass(array[1])}">
      <span class="text-numeric">${array[1]}</span>
    </button></li>
    <li><button class="btn-pagination__numeric ${toAddCurrentClass(array[2])}">
      <span class="text-numeric">${array[2]}</span>
    </button></li>
    <li><button class="btn-pagination__numeric ${toAddCurrentClass(array[3])}">
      <span class="text-numeric">${array[3]}</span>
    </button></li>
    </ul>`;
};

isAvailableBtn = (...args) => {
  if (currentPage - 2 > 0) {
    args[0].classList.add('btn-available');
  } else {
    args[0].classList.add('btn-not-available');
  }

  if (currentPage - 1 > 0) {
    args[1].classList.add('btn-available');
  } else {
    args[1].classList.add('btn-not-available');
  }

  if (currentPage + 1 <= countPages) {
    args[2].classList.add('btn-available');
  } else {
    args[2].classList.add('btn-not-available');
  }

  if (currentPage + 2 <= countPages) {
    args[3].classList.add('btn-available');
  } else {
    args[3].classList.add('btn-not-available');
  }

 
};



const renderNumbers = () => {
  if (window.screen.width >= 768) {
    return tabletAndDesktopRendering(numericBtnFunc(currentPage));
  }

  return mobileRendering(numericBtnFunc(currentPage));
};

const toAddListeners = (...args) => {
  const handleBtmClick = 

  args.map(button => button.addEventListener('click', event => {
    event.preventDefault();

    if (
      button.classList.contains('btn-pagination__double-arrow-left') &&
      button.classList.contains('btn-available')
    ) {
      currentPage -= 2;
      mainRenderingFunc(currentPage);
    }

    if (
      button.classList.contains('btn-pagination__arrow-left') &&
      button.classList.contains('btn-available')
    ) {
      currentPage -= 1;
      mainRenderingFunc(currentPage);
    }

    if (
      button.classList.contains('btn-pagination__arrow-right') &&
      button.classList.contains('btn-available')
    ) {
      currentPage += 1;
      mainRenderingFunc(currentPage);
    }

    if (
      button.classList.contains('btn-pagination__double-arrow-right') &&
      button.classList.contains('btn-available')
    ) {
      currentPage += 2;
      mainRenderingFunc(currentPage);
    }

    
  }));

  
};

export const renderPaginationBtn = () => {
  console.log('books.length in buttons', books.length);
  if (books.length === 0 || books.length <= 3) {
    return;
  }

  paginationBtnEl.innerHTML = `
    <li>
    <ul class="btn-pagination__arrow-list">
      <li>
        <button class="btn-pagination__double-arrow-left">
          <svg class="" width="32" height="32">
            <use href="${spriteSvgEls}#double-check-left"></use>
          </svg>
        </button>
      </li>
      <li>
        <button class="btn-pagination__arrow-left" style={fill: #fff;}>
          <svg class="" width="24" height="24">
            <use href="${spriteSvgEls}#icon-check-left"></use>
          </svg>
        </button>
      </li>
    </ul>
    </li>
    <li class="btn-paggination__numbers">
    ${renderNumbers()}
    </li>
    <li>
    <ul class="btn-pagination__arrow-list">
      <li>
        <button class="btn-pagination__arrow-right">
          <svg class="" width="24" height="24">
            <use href="${spriteSvgEls}#check-right"></use>
          </svg>
        </button>
      </li>
      <li>
        <button class="btn-pagination__double-arrow-right">
          <svg class="" width="32" height="32">
            <use href="${spriteSvgEls}#double-check-right"></use>
          </svg>
        </button>
      </li>
    </ul>
    </li>
    `;

  const arrowDoubleLeftBtnEl = document.querySelector(
    '.btn-pagination__double-arrow-left'
  );
  const arrowLeftBtnEl = document.querySelector('.btn-pagination__arrow-left');
  const arrowRightBtnEl = document.querySelector(
    '.btn-pagination__arrow-right'
  );
  const arrowDoubleRightBtnEl = document.querySelector(
    '.btn-pagination__double-arrow-right'
  );

  isAvailableBtn(
    arrowDoubleLeftBtnEl,
    arrowLeftBtnEl,
    arrowRightBtnEl,
    arrowDoubleRightBtnEl
  );

  toAddListeners(
    arrowDoubleLeftBtnEl,
    arrowLeftBtnEl,
    arrowRightBtnEl,
    arrowDoubleRightBtnEl
  );


};
