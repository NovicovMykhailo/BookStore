import supportCompanies from './support-data.js';

const supportCompaniesRef = document.querySelector('.support-companies');
const scrollDownBtn = document.querySelector('.scroll-down-btn');
// const arrOfSupportCompanies = supportCompaniesRef.children;

createSupportCompaniesList(supportCompanies);

// scrollDownBtn.addEventListener('click', onScrollDownBtnClick);

const srces = [
  (src = './images/SupportUkraineCompanies/SaveChildren.png'),
  (src = './images/SupportUkraineCompanies/HOPE.png'),
  (src = './images/SupportUkraineCompanies/MedCorps.png'),
  (src = './images/SupportUkraineCompanies/Razom.png'),
  (src = './images/SupportUkraineCompanies/AAH.png'),
  (src = './images/SupportUkraineCompanies/Prytuls.png'),
  (src = './images/SupportUkraineCompanies/United24.png'),
  (src = './images/SupportUkraineCompanies/WordVision.png'),
  (src = './images/SupportUkraineCompanies/MedSans.png'),
];

function createSupportCompaniesList(supportCompanies) {
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
      height ="32" />
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
  return number;
}

// for (let i = 0; i <= arrOfSupportCompanies.length - 1; i += 1) {
//   arrOfSupportCompanies[i].children[0].src =
//     arrOfSupportCompanies[i + 1].children[0].src;
// }
