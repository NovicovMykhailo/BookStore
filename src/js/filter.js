// Import another JS
import { BookAPI } from "./book-api";
import { createBookCard } from "./book-card-template";
import { colorLastWordInTitle } from "./color-last-words";
import { fetchAndRenderBooks } from "./top-book";
import { backToTop } from "./scroll-top-btn";

// Create first markup
fetchAndRenderBooks();

// Test zone

let btnAllListener = document.querySelector(".gallery__list");

// Listenr for btn and gallery to open modal window
btnAllListener.addEventListener("click", (event) => {
	if (event.target.localName === "button") {
		varWithCurrentCategoryValue = event.target.getAttribute('data-list-name');
		addGalleryMarkupAndChangeFilter(event);
		backToTop();
	} else {
		// Тут потрібно визивати модалку!!
		console.log(event.target);
	}
})

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
			return `<ul class="filter__item" data-mark-active="${value.list_name}">${value.list_name}</ul>`
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

	addGalleryMarkupAndChangeFilter(event);
})

function addGalleryMarkupAndChangeFilter(event) {
	const targetEl = document.querySelector(`[data-mark-active="${varWithCurrentCategoryValue}"]`);

	varWithActiveValueFilter.classList.remove("filter__item--active");

	targetEl.classList.add("filter__item--active");

	varWithActiveValueFilter = targetEl;

	fetchToApiUseCatagory(varWithCurrentCategoryValue);
	// Color title words
	colorLastWordInTitle();
}

// Request to bookApi and add books markup
const fetchToApiUseCatagory = (value) => {
	// Cheking "all categories" value 
	if (value === "All categories") {
		bookApi.getTopBooks().then(data => {
			// Work with datas
			fetchAndRenderBooks();
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
