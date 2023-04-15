export function colorLastWordInTitle() {
	// Find title
	const galleryTitle = document.querySelector(".book-card__title");
	// Recieve text from title
	const textgalleryTitle = galleryTitle.innerHTML;
	// Make aaray from title
	let wordsArray = textgalleryTitle.split(" ");
	// Recieve last word
	let lastWord = wordsArray.pop();
	// Make value from other words
	let firstPart = wordsArray.join(" ");
	// Renew title with words, which have span with styles
	galleryTitle.innerHTML = `${firstPart} <span class="book-card__title--accent-word">${lastWord}</span>`;
}

// Color before start
// colorLastWordInTitle(); 