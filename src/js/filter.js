import { BookAPI } from "./book-api";
import { createBookCard } from "./book-card-template";
import { colorLastWordInTitle } from "./color-last-words";

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
	colorLastWordInTitle();
})


const galleryListEl = document.querySelector(".book-card__list");
const galleryTitle = document.querySelector(".book-card__title");
// console.log(galleryListEl);

const fetchToApiUseCatagory = (value) => {
	// const bookApiCat = new BookAPI();
	bookApi.category = value;
	galleryTitle.innerHTML = value;
	// console.log("Console cat from class: " + bookApi.category);
	// let galleryItemElems;

	// bookApi.getSelectedCategoryBooks().then(data => {
	// 	let galleryItemElems = data.data.map(({ book_image, title, author, description}) => {
	// 		return `<li class="gallery__item">
	//    				<img
	// 					class="gallery_img"
	//     				 src="${book_image}"
	//     				 alt="${description}"
	//      				 width="100%"
	//    				/>
	//    			  <h2 class="gallery__title">${title}</h2>
	//    			  <p class="gallery__author">${author}</p>
	//  				</li>`}).join("");
	// 	galleryListEl.innerHTML = "";
	// 	galleryListEl.insertAdjacentHTML("beforeend", galleryItemElems);
	// })

	console.log(createBookCard({ book_image: "href", title: "title", author: "author" }));
	
	bookApi.getSelectedCategoryBooks().then(data => {
		let galleryItemElems = data.data.map(({ book_image, title, author, description }) => {
			return createBookCard({ book_image: book_image, title: title, author: author });
		})
		galleryListEl.innerHTML = "";
		galleryListEl.insertAdjacentHTML("beforeend", galleryItemElems);
	}
	)
	}
