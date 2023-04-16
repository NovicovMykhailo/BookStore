import supportCompanies from './support-data.js';

function createSupportCompaniesList(supportCompanies) {
  const supportCompaniesRef = document.querySelector('.support-companies');
  let counter = 0;

  const markup = supportCompanies
    .map(({ url, img, img2, title }) => {
      counter += 1;
      return `<div class="swiper-slide">
      <p>${leadingZero(counter)}</p>
    <a
    class="support-companies__link"
    href="${url}" 
    target="_blank" 
    rel="noopener noreferrer">
      <img 
        class="support-companies__img"
      srcset="${img} 1x, ${img2} 2x" 
      alt="${title}" 
      loading="lazy" 
      height ="32"/>
     </a>
    </div>`;
    })
    .join('');

  supportCompaniesRef.insertAdjacentHTML('beforeend', markup);
}

function leadingZero(number) {
  if (number < 10) {
    return String(number).padStart(2, '0');
  }
  return String(number);
}

createSupportCompaniesList(supportCompanies);
