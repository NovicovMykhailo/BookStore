import { BookAPI } from './book-api.js';
import { createBookCard } from './book-card-template.js';

let currentRenderWidth = window.innerWidth;
let amountRenderedBooks = 1;

addEventListener('resize', event => {
  if (
    (window.innerWidth > 767 && currentRenderWidth < 768) ||
    (window.innerWidth > 1439 && currentRenderWidth < 1440) ||
    (window.innerWidth < 1440 && currentRenderWidth > 1439) ||
    (window.innerWidth < 768 && currentRenderWidth > 767)
  ) {
    location.reload();
  }
});

function createMainUl(obj) {
  if (currentRenderWidth < 768) {
    amountRenderedBooks = 1;
  } else if (currentRenderWidth > 767 && currentRenderWidth < 1440) {
    amountRenderedBooks = 3;
  } else {
    amountRenderedBooks = 5;
  }

//   const sectionTitle = document.createElement('h2');
//   sectionTitle.classList.add('section-title');
//   sectionTitle.setAttribute('data-text', 'Books');
//   sectionTitle.textContent = 'Best Sellers Books';

//   booksContainer.prepend(sectionTitle);

//   const mainList = document.createElement('ul'); gallery__list
//   booksContainer.appendChild(mainList).classList.add('main-list');
//   document.querySelector('.main-list').innerHTML =
	
  document.querySelector('.gallery__list').innerHTML =
    createMarcup(obj).join('');
}

function createMarcup(obj) {
  return obj.map(e => {
    const { list_name, books } = e;
    return ` <li class="books-list list">
            <h3 class="block-title">${list_name}</h3>
                <ul class="book-card__list list" ()>
                  ${books
                    .slice(0, amountRenderedBooks)
                    .map(createBookCard)
                    .join('')}
                </ul>
              <button class="btn-default btn-all-categories-js" data-list-name="${list_name}">see more</button>
        </li>`;
  });
}
const bookApi = new BookAPI();



export async function fetchAndRenderBooks() {
  try {
    const response = await bookApi.getTopBooks();
    createMainUl(response.data);
  } catch (error) {
    console.error(error);
  }
}
