import {BookAPI} from "./book-api";

const bookApi = new BookAPI();

const filterListEl = document.querySelector(".filter__list");
// const filterItemAllEl = document.querySelectorAll(".filter__item");
// console.log(filterListEl);

// console.log("Start");

bookApi.getBooksCategoriesList().then(
	data => {
		const filterMarkup = data.data.map(value => {
			return `<ul class="filter__item">${value.list_name}</ul>`
		}).join("");
		filterListEl.insertAdjacentHTML("beforeend", filterMarkup);
	}
)

let varWithActiveValueFilter = document.querySelector(".filter__item--active");
let varWithCurrentCategoryValue = "ALL CATEGORIES";
console.log(varWithCurrentCategoryValue);


filterListEl.addEventListener("click", event => {
	if (event.target.outerText.toLowerCase() === varWithCurrentCategoryValue.toLowerCase()) {
		return console.log("Stop");	
	}
	varWithCurrentCategoryValue = event.target.outerText;
	// console.log("currentValue: " + varWithCurrentCategoryValue);
	const targetEl = event.target;
	// console.log(varWithActiveValueFilter);
	varWithActiveValueFilter.classList.remove("filter__item--active");
	
	targetEl.classList.add("filter__item--active");

	varWithActiveValueFilter = document.querySelector(".filter__item--active");

	fetchToApiUseCatagory(varWithCurrentCategoryValue);
})


const galleryListEl = document.querySelector(".gallery__list");
const galleryTitle = document.querySelector(".gallery__main-title");
// console.log(galleryListEl);

const fetchToApiUseCatagory = (value) => {
	// const bookApiCat = new BookAPI();
	bookApi.category = value;
	galleryTitle.innerHTML = value;
	// console.log("Console cat from class: " + bookApi.category);
	// let galleryItemElems;

	bookApi.getSelectedCategoryBooks().then(data => {
		let galleryItemElems = data.data.map(({ book_image, title, author, description}) => {
			return `<li class="gallery__item">
      				<img
						class="gallery_img"
       				 src="${book_image}"
       				 alt="${description}"
        				 width="100%"
      				/>
      			  <h2 class="gallery__title">${title}</h2>
      			  <p class="gallery__author">${author}</p>
    				</li>`}).join("");
		galleryListEl.innerHTML = "";
		galleryListEl.insertAdjacentHTML("beforeend", galleryItemElems);
	})
}
