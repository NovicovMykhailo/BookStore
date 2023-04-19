import spriteSvgEls from '../images/svg-sprite.svg';



// import addToLocalStorage from './add-to-shopping-list';
import removeFromLocalStorage from './remove-from-shopping-list';
// import { renderPaginationBtn, currentPage } from '../js/shopping-list__pagination';
// import { paginationBtnEl } from '../js/shopping-list__pagination';
import { books } from './shopping-list__books';
import murkupForTabletAndDesktop from './render-shopping-card';
import imageOnEmptyBasket from './add-empty-basket-image'
// Import Database
import { useFirebase } from './firebase.js';
import { async } from '@firebase/util';
import { resolve } from 'path';
const firebase = new useFirebase;

const paginationBtnEl = document.querySelector('.btn-pagination__list');
const supUkrContainerEl = document.querySelector('.support-ukraine');
const shoppingListSectionEl = document.querySelector('.shopping-list__page');
const onEmptyBasketImg = document.querySelector('.on-empty-container');
const ulEl = document.querySelector('.shopping-list');

const countPages = Math.ceil(books.length / 3);
let currentPage = 1;

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
		// console.log('i: ', i);
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
};

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
// pagination active page
toAddCurrentClass = num => {
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
	args.map(button =>
		button.addEventListener('click', event => {
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
		})
	);
};
// главная функция по рендеру списка кнопок

function renderPaginationBtn() {
	//console.log('books.length in buttons', books.length);
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
	const arrowRightBtnEl = document.querySelector('.btn-pagination__arrow-right');
	const arrowDoubleRightBtnEl = document.querySelector('.btn-pagination__double-arrow-right');

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
}

//============    RENDER MARKUP ========= !!!!!DO NOT TOUCH

function mainRenderingFunc() {
	// if localstorage has object


	if (
		localStorage.getItem('shopping-list') !== null &&
		JSON.parse(localStorage.getItem('shopping-list') && books.length !== 0)
	) {
		ulEl.innerHTML = murkupShoppingList(currentPage);
		renderPaginationBtn();
	} else {
	}

};

try {
	mainRenderingFunc();
} catch (error) {

}
// tresh icon-button fuctionality
function moveToTrashItem() {
	const trashIcon = document.querySelectorAll('.btn');
	trashIcon.forEach(e => e.addEventListener('click', (r) => trashTest(r)))
}
async function trashTest(r) {

	let currentBookTitle =
		r.currentTarget.parentElement.children[0].children[1].children[0]
			.textContent;

	await books.forEach((book) => {
		const bookIdToDelete = book._id;
		if (book.title === currentBookTitle) {
			console.log("BookIdForDelete: " + bookIdToDelete);
			firebase.selectBookFromArray(bookIdToDelete);
		}
	})

	setTimeout(() => {
		location.reload();
	}, 2500);

}


function removeItemFromBasket(title) {
	books.map((b, i) => {

		// console.log(b.title === title);
		if (b.title === title) {
			books.splice(i, 1);

			// console.log(books);
			localStorage.setItem('shopping-list', JSON.stringify(books));
			// ulEl.innerHTML = murkupShoppingList(books)



			return;
		}
	});
}

moveToTrashItem();

