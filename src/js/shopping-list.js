// import addToLocalStorage from './add-to-shopping-list';
// import removeFromLocalStorage from './remove-from-shopping-list';
// import { paginationBtnEl } from '../js/shopping-list__pagination';
import { renderPaginationBtn, currentPage } from '../js/shopping-list__pagination';
import { books } from './shopping-list__books';




const addBookBtnEl = document.querySelector('[data-add]');
const supUkrContainerEl = document.querySelector('.support-ukraine');
const ulEl = document.querySelector('.check');
export const shoppingListSectionEl = document.querySelector('.shopping-list__page');
const shoppingListContainer = shoppingListSectionEl.parentNode;




const getListObjectsOfPage = numberPage => {
  let indexOfStart = (numberPage * 3) - 3;
  const arrayOfBooks = [];

  for (let i = indexOfStart; i < indexOfStart + 3; i += 1){
    console.log('i: ', i);
    arrayOfBooks.push(books[i]);
  }

  return arrayOfBooks;
}

const getAppropriateMurkup = (book) => {
  if (window.screen.width < 768) {
    return murkupForMobile(book);
  }

  return murkupForTabketAndDesktop(book);
}

export const murkupShoppingList = numberPage => {
  const arrayOfMurkup = [];
  getListObjectsOfPage(numberPage).map(book => {

    arrayOfMurkup.push(getAppropriateMurkup(book))
  })


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


