import { supportCompanies } from './support-data.js';

function createSupportList() {
  const companiesList = document.querySelector('.support-companies');
  let counter = 0;

  const markup = supportCompanies
    .map(({ url, img, img2, title }) => {
      counter += 1;
      return `<li class="company__item"> ${leadingZeros(counter)}
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

const btnEl = document.querySelector('.support__load-more');
const supportList = document.querySelector('.support-companies');

btnEl.addEventListener('click', () => {
  const { height: itemHeight } = document
    .querySelector('.support-companies')
    .firstElementChild.getBoundingClientRect();

  supportList.scrollBy({
    top: itemHeight * 4,
    behavior: 'smooth',
  });
});
