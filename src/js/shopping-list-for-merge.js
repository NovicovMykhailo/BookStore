import spriteSvgEls from '../images/svg-sprite.svg';
import { books } from './shopping-list__books';
import murkupForTabletAndDesktop from './render-shopping-card';
import { useFirebase } from './firebase';
import { showLoadingIndicator, removeLoader } from './loader';
import Notiflix from 'notiflix';

const firebase = new useFirebase();

const paginationBtnEl = document.querySelector('.btn-pagination__list');
const ulEl = document.querySelector('.shopping-list');
const reloadDelay = 2500;

const countPages = Math.ceil(books.length / 3);
let currentPage;

// let currentPage;

const numericBtnFunc = curP => {
  const stringMore = '...';
  const array = [];

  if (countPages === 2) {
    array.push('1', '2');
  }

  if (countPages === 3) {
    array.push('1', '2', '3');
  }

  if (window.screen.width < 768) {
    if (countPages > 3) {
      if (curP === countPages) {
        array.push(stringMore, String(curP - 1), String(curP));
      }

      if (curP + 1 === countPages) {
        array.push(stringMore, String(curP), String(curP + 1));
      }

      if (countPages - curP === 2) {
        array.push(String(curP), String(curP + 1), String(curP + 2));
      }

      if (countPages - curP > 2) {
        array.push(String(curP), String(curP + 1), stringMore);
      }
    }

    return array;
  }

  if (countPages === 4) {
    array.push('1', '2', '3', '4');
  }

  if (countPages > 4) {
    if (curP === countPages) {
      array.push(stringMore, String(curP - 2), String(curP - 1), String(curP));
    }

    if (curP + 1 === countPages) {
      array.push(stringMore, String(curP - 1), String(curP), String(curP + 1));
    }

    if (curP + 2 === countPages) {
      array.push(stringMore, String(curP), String(curP + 1), String(curP + 2));
    }

    if (countPages - curP === 3) {
      array.push(
        String(curP),
        String(curP + 1),
        String(curP + 2),
        String(curP + 3)
      );
    }

    if (countPages - curP > 2) {
      array.push(String(curP), String(curP + 1), String(curP + 2), stringMore);
    }
  }

  return array;
};

const getListObjectsOfPage = numberPage => {
  let indexOfStart = numberPage * 3 - 3;
  const arrayOfBooks = [];

  for (let i = indexOfStart; i < indexOfStart + 3; i += 1) {
    if (i <= books.length - 1) {
      arrayOfBooks.push(books[i]);
    }
  }

  return arrayOfBooks;
};
// return marckup
function murkupShoppingList(numberPage) {
  const arrayOfMurkup = [];
  getListObjectsOfPage(numberPage).map(book => {
    arrayOfMurkup.push(murkupForTabletAndDesktop(book));
  });

  return arrayOfMurkup.join('');
}

// ============    PAGINATION ============
//pagination
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
    <li><button class="btn-pagination__numeric ${toAddCurrentClass(
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
// pagination styling
const isAvailableBtn = (...args) => {
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
// pagination active page
const toAddCurrentClass = num => {
  const numberedNum = Number(num);
  if (num === '...') {
    return;
  }

  if (numberedNum === currentPage) {
    return 'btn-current';
  }
};
//pagination numbers
const renderNumbers = () => {
  if (window.screen.width >= 768) {
    return tabletAndDesktopRendering(numericBtnFunc(currentPage));
  }

  return mobileRendering(numericBtnFunc(currentPage));
};
// pagination listener
const toAddListeners = (...args) => {
  let pageNumbers = document.querySelectorAll(
    '.btn-pagination__numeric-list'
  )[0].children.length;

  args.map(button =>
    button.addEventListener('click', event => {
      event.preventDefault();

      if (
        button.classList.contains('btn-pagination__double-arrow-left') &&
        button.classList.contains('btn-available')
      ) {
        currentPage = 1;
        storeCurrentPage(currentPage);
        mainRenderingFunc(currentPage);
      }

      if (
        button.classList.contains('btn-pagination__arrow-left') &&
        button.classList.contains('btn-available')
      ) {
        currentPage -= 1;
        storeCurrentPage(currentPage);
        mainRenderingFunc(currentPage);
      }

      if (
        button.classList.contains('btn-pagination__arrow-right') &&
        button.classList.contains('btn-available')
      ) {
        currentPage += 1;
        storeCurrentPage(currentPage);
        mainRenderingFunc(currentPage);
      }

      if (
        button.classList.contains('btn-pagination__double-arrow-right') &&
        button.classList.contains('btn-available')
      ) {
        currentPage = Number(pageNumbers);
        storeCurrentPage(currentPage);
        mainRenderingFunc(currentPage);
      }
    })
  );
};
// главная функция по рендеру списка кнопок
function renderPaginationBtn() {
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

  // добавляет классы доступа до страничек (если есть след. стр, то добавляет btn-available)
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
  paginationNumbersPress();
}

//============    RENDERING MARKUP ON START =========

function mainRenderingFunc() {
  // if localstorage has object

  if (
    localStorage.getItem('shopping-list') !== null &&
    JSON.parse(localStorage.getItem('shopping-list') && books.length !== 0)
  ) {
    ulEl.innerHTML = murkupShoppingList(currentPage);
    renderPaginationBtn();
    moveToTrashItem();
  }
}

try {
  if (sessionStorage.getItem('current-page')) {
    currentPage = JSON.parse(sessionStorage.getItem('current-page'));
  } else {
    currentPage = 1;
  }
  mainRenderingFunc();
} catch (error) {
  Notiflix.failure('oops something went wrong');
}
// tresh icon-button fuctionality
function moveToTrashItem() {
  const trashIcon = document.querySelectorAll('.btn');
  trashIcon.forEach(e => e.addEventListener('click', r => trashTest(r)));
}
async function trashTest(r) {
  if(document.querySelector(
    '.btn-pagination__numeric.btn-current'
  )) {
    let pageNumOnDelete = document.querySelector('.btn-pagination__numeric.btn-current').textContent;
    storeCurrentPage(pageNumOnDelete);
    
  }
  

  let currentBookTitle =
    r.currentTarget.parentElement.children[0].children[1].children[0]
      .textContent;

  try {
    await books.forEach(book => {
      const bookIdToDelete = book._id;
      if (book.title === currentBookTitle) {
        firebase.selectBookFromArray(bookIdToDelete);

		   if (ulEl.childNodes.length === 1) {
		  storeCurrentPage(pageNumOnDelete-1);}
        showLoadingIndicator();
      }
    });
  } catch (error) {}

  setTimeout(() => {
    location.reload();
  }, reloadDelay);
}

// function removeItemFromBasket(title) {
// 	books.map((b, i) => {

// 		if (b.title === title) {
// 			books.splice(i, 1);

// 			localStorage.setItem('shopping-list', JSON.stringify(books));

// 			return;
// 		}
// 	});
// }

//storring current page number
function storeCurrentPage(number) {
  sessionStorage.setItem('current-page', number);
}
//reseting page on shopping-page leave

const homeBtn = document.querySelector('.nav-item').firstElementChild;
const homeBtnMob = document.querySelector(
  '.nav__list-mob-menu'
).firstElementChild;

homeBtn.addEventListener('click', storeCurrentPage(1));
homeBtnMob.addEventListener('click', storeCurrentPage(1));

// function on pagination numbers click
function paginationNumbersPress() {
  if (document.querySelectorAll('.btn-pagination__numeric-list')) {
    let pageNumberNums = document.querySelectorAll(
      '.btn-pagination__numeric-list'
    );
    pageNumberNums.forEach(e => e.addEventListener('click', onNumbersClick));

    function onNumbersClick(e) {
      if (
        e.target.className === 'text-numeric' ||
        e.target.className === 'btn-pagination__numeric undefined'
      ) {
        currentPage = Number(e.target.innerText);
        storeCurrentPage(currentPage);
        mainRenderingFunc();
      }
    }
  }
}

