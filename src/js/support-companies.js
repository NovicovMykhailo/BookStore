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
