import { supportCompanies } from './support-data.js';

const companiesList = document.querySelector('.support-companies');

function createSupportList() {
  let counter = 0;

  const markup = supportCompanies
    .map(({ url, img, img2, title }) => {
      counter += 1;
      return `<li class="company__item swiper-slide"> ${leadingZeros(counter)}
    <a class="company__link" href="${url}" target="_blank" rel="noopener noreferrer">
      <img class="company__img" src="${img2}" srcset="${img} 1x, ${img2} 2x" alt="${title}"  loading="lazy" />
     </a>
    </li>`;
    })
    .join('');

  companiesList.insertAdjacentHTML('beforeend', markup);
}

function leadingZeros(num) {
  return String(num).padStart(2, '0');
}

createSupportList();

// const btnEl = document.querySelector('.support__load-more');
// const supportList = document.querySelector('.support-companies');

// btnEl.addEventListener('click', onLoadMoreBtnClick);

// function onLoadMoreBtnClick () {
//   const { height: itemHeight } = companiesList.firstElementChild.getBoundingClientRect();

//   supportList.scrollBy({
//     top: itemHeight * 4,
//     behavior: 'smooth',
//   });
// }

// companiesList.addEventListener('scroll', onScrollChangeBtn);

// function onScrollChangeBtn () {
// if (window.scrollHeights === window.clientHeight) {
// btnEl.removeEventListener('click', onLoadMoreBtnClick);
// btnEl.classListAdd('.support__load-more--top');
// btnEl.addEventListener('click', onSupportScrollTop);
// }
// }

// function onSupportScrollTop () {
//   const { height: itemHeight } = companiesList.lastElementChild.getBoundingClientRect();

//   supportList.scrollBy({
//     bottom: itemHeight * 4,
//     behavior: 'smooth',
//   });
// }