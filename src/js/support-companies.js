// import  supportCompanies from './json/supportUkraine.json';
// import  supportCompanies from './support.js';

export default function createSupportList() {
  const companiesList = document.querySelector('.support-companies');
  let counter = 0;
  
  const markup = supportCompanies
    .map(({ url, img, img2, title }) => {
      counter += 1;
     return `<li class="company__item"> ${leadingZeros(counter)}
    <a class="company__link" href="${url}" target="_blank" rel="noopener noreferrer">
      <img class="company__img" srcset="${img} 1x, ${img2} 2x" alt="${title}" loading="lazy" />
     </a>
    </li>`;
    })
    .join('');
  
  companiesList.insertAdjacentHTML('beforeend', markup);
};

function leadingZeros(num) {
    return String(num.padStart(2, '0'))
};

const loadMoreBtnEl = document.querySelector('.support_load-more');

const swiper = new Swiper('.swiper', {
  direction: 'vertical',
  loop: true,
  
  navigation: {
    nextEl: '.swiper-button-next',
  },
});