// const supportCompaniesRef = document.querySelector('.support-companies');
const scrollDownBtn = document.querySelector('.scroll-down-btn');
const arrayOfSupportCompanies = document.querySelectorAll(
  '.support-companies__item'
);

console.log(arrayOfSupportCompanies);

scrollDownBtn.addEventListener('click', onScrollDownBtnClick);

// const saveChImg = document.querySelector('.save-children-img');
// console.log(saveChImg.src);

// function onScrollDownBtnClick() {
//   const arrOfCompanyImgSrc = [];

//   arrayOfSupportCompanies.forEach(company => {
//     arrOfCompanyImgSrc.push(company.children[0].src);
//   });
//   console.log(arrOfCompanyImgSrc);
// }

function onScrollDownBtnClick() {
  const arrOfCompanyImgSrc = [];

  arrayOfSupportCompanies.forEach(company => {
    // console.log(company.children[0].src);
    arrOfCompanyImgSrc.push(company.children[0].src);
    // company.children[0].src = company.children[0].nextSibling.src;
  });
  console.log(arrOfCompanyImgSrc);
}
