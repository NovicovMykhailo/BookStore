import { BookAPI } from './book-api.js';
import { createBookCard } from './book-card-template.js';
import { Block } from 'notiflix/build/notiflix-block-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import AOS from 'aos'; //animation lib
AOS.init(); //animation lib init


const spinnerOptions = {

  backgroundColor: 'transparent',
  svgColor: 'gray',
  svgSize: '100px',
  querySelectorLimit: 20,
};

const notifyOptions = {
  fontFamily: 'DMSans',
};

let currentRenderWidth = window.innerWidth;
let amountRenderedBooks = 1;

addEventListener('resize', () => {
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

  document.querySelector('.gallery__list').innerHTML =
    createMarcup(obj).join('');
}

export function createMarcup(obj) {
  return obj.map(e => {
    const { list_name, books } = e;
    let delay = 0;
    return ` <li class="books-list list">
            <h3 class="block-title">${list_name}</h3>
                <ul class="book-card__list list" ()>
                  ${books
                    .slice(0, amountRenderedBooks)
                    .map(e => {
                      delay += 50;
                      return createBookCard(e, delay);
                    })
                    .join('')}
                </ul>
              <button class="btn-default btn-all-categories-js" data-list-name="${list_name}">see more</button>
        </li>`;
  });
}
const bookApi = new BookAPI();

export async function fetchAndRenderBooks() {
  if ('topBooks' in sessionStorage) {
    // Block.standard('.gallery_container', spinnerOptions);
    let response = sessionStorage.getItem('topBooks');
    createMainUl(JSON.parse(response));
    AOS.refresh();
    return;
  } else {
    try {
      Block.standard('.gallery_container', spinnerOptions);
      const response = await bookApi.getTopBooks();
      createMainUl(response.data);
      AOS.refresh();
      sessionStorage.setItem('topBooks', JSON.stringify(response.data));
      Block.remove('.gallery_container');
    } catch (error) {
      Notify.failure('Oops somthing went wrong', notifyOptions);
    }
  }
}
