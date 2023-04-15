import { supportCompanies } from './support-data';

const companiesList = document.querySelector('.support-companies');

export default function createSupportList(company) {
  let counter = 0;

  const markup = company
    .map(({ url, img, img2, title }) => {
      counter += 1;
      return `<li class="company__item">
      <p>${leadingZeros(counter)}</p>
    <a
    class="company__link"
    href="${url}" 
    target="_blank" 
    rel="noopener noreferrer">
      <img 
        class="company__img"
      srcset="${img} 1x, ${img2} 2x" 
      alt="${title}" 
      loading="lazy" 
      height ="32" />
     </a>
    </li>`;
    })
    .join('');

  companiesList.insertAdjacentHTML('beforeend', markup);
}

function leadingZeros(num) {
  return String(num).padStart(2, '0');
}

createSupportList(supportCompanies);
