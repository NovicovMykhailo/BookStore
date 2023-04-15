import { BookAPI } from "./book-api";
import { createBookCard } from "./book-card-template";
import { colorLastWordInTitle } from "./color-last-words";

const bookApi = new BookAPI();

const filterListEl = document.querySelector(".filter__list");
console.log(filterListEl);


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

filterListEl.addEventListener("click", event => {
	if (event.target.outerText.toLowerCase() === varWithCurrentCategoryValue.toLowerCase()) {
		return 	
	}
	varWithCurrentCategoryValue = event.target.outerText;
	
	const targetEl = event.target;
	
	varWithActiveValueFilter.classList.remove("filter__item--active");
	
	targetEl.classList.add("filter__item--active");

	varWithActiveValueFilter = document.querySelector(".filter__item--active");

	fetchToApiUseCatagory(varWithCurrentCategoryValue);
	colorLastWordInTitle();
})


const galleryListEl = document.querySelector(".gallery__list");
const galleryTitle = document.querySelector(".book-card__title");

const fetchToApiUseCatagory = (value) => {
	
	bookApi.category = value;
	galleryTitle.innerHTML = value;
	
	bookApi.getSelectedCategoryBooks().then(data => {
		let galleryItemElems = data.data.map(({ book_image, title, author, description }) => {
			return createBookCard({ book_image: book_image, title: title, author: author });
		}).join("");
		galleryListEl.innerHTML = "";
		galleryListEl.insertAdjacentHTML("beforeend", galleryItemElems);
		}
	)
}
