// Import another JS
import { BookAPI } from "./book-api";
import { createBookCard } from "./book-card-template";
import { colorLastWordInTitle } from "./color-last-words";

// Initialize bookApi 
const bookApi = new BookAPI();

// Find elements from DOM for work
const filterListEl = document.querySelector(".filter__list");
let varWithActiveValueFilter = document.querySelector(".filter__item--active");
const galleryListEl = document.querySelector(".gallery__list");
const galleryTitle = document.querySelector(".book-card__title");

// Vars for datas
let varWithCurrentCategoryValue = "ALL CATEGORIES";


// Create request and add filter markup
bookApi.getBooksCategoriesList().then(
	data => {
		const filterMarkup = data.data.map(value => {
			return `<ul class="filter__item">${value.list_name}</ul>`
		}).join("");
		filterListEl.insertAdjacentHTML("beforeend", filterMarkup);
	}
)

// Add listener which listen what catagory we choose
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
	// Color title words
	colorLastWordInTitle();
})

// Request to bookApi and add books markup
const fetchToApiUseCatagory = (value) => {
	// Cheking "all categories" value 
	if (value === "All categories") {
		bookApi.getTopBooks().then(data => {
			// Work with datas
		})
		return galleryTitle.innerHTML = "Best Sellers Books";
	}

	bookApi.category = value;
	galleryTitle.innerHTML = value;

	bookApi.getSelectedCategoryBooks().then(data => {
		let galleryItemElems = data.data.map(({ book_image, title, author}) => {
			return createBookCard({ book_image: book_image, title: title, author: author });
		}).join("");
		galleryListEl.innerHTML = "";
		galleryListEl.insertAdjacentHTML("beforeend", galleryItemElems);
	}
	)
}
