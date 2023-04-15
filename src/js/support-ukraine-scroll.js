const supportCompaniesRef = document.querySelector('.support-companies');
const scrollDownBtn = document.querySelector('.scroll-down-btn');
const arrayOfSupportCompanies = document.querySelectorAll(
  '.support-companies__item'
);
const arrayOfSupportImgs = document.querySelectorAll('.support-img');

scrollDownBtn.addEventListener('click', onScrollDownBtnClick);

const saveChImg = document.querySelector('.save-children-img');

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

function onScrollDownBtnClick() {
  const arrOfCompanyImgSrc = [];
  const firstImg = supportCompaniesRef.firstChild;

  for (let i = 0; i <= arrayOfSupportCompanies.length - 1; i += 1) {
    arrayOfSupportCompanies[i].children[0].src =
      arrayOfSupportCompanies[i + 1].children[0].src;

    supportCompaniesRef.append(firstImg);
    firstImg.remove();
  }

  console.log(arrayOfSupportCompanies);
}
