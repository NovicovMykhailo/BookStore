const supportCompaniesRef = document.querySelector('.support-companies');
const scrollDownBtn = document.querySelector('.scroll-down-btn');
const arrayOfSupportCompanies = document.querySelectorAll(
  '.support-companies__item'
);

// scrollDownBtn.addEventListener('click', onScrollDownBtnClick);

// const arrayOfSupportCompanies = supportCompaniesRef.children;

// function onScrollDownBtnClick() {}

// const children = supportCompaniesRef.childNodes;

// console.log(children);

// supportCompaniesRef.lastElementChild.innerHTML = 'acaccaca';

// const supCompaniesNewArr = [...arrayOfSupportCompanies];

// console.log(supCompaniesNewArr);
// console.log(supCompaniesNewArr[0]);

// supCompaniesNewArr.forEach(company => {
//   console.log(company.children[0].src);
// });

// const saveChImg = document.querySelector('.save-children-img');
// console.log(saveChImg.src);

arrayOfSupportCompanies.forEach(company => {
  console.log(company.children[0].src);
});
