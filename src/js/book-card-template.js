export function createBookCard(book) {
  const { _id, book_image, title, author } = book;
  return `<li class="book-card">
    <a href="#" class="book-card__link">
    <div class="book-card__thumb">
    <img class="book-card__image" src="${book_image}" alt="${author} ${title}" loading="lazy">
    <p class="book-card__notification">Quick view</p>
    <p class="book-card__id visually-hidden">${_id}</p>
    </div>
    <div class="book-card__info">
    <p class="info-item__title">${title}</p>
    <p class="info-item__author">${author}</p>
    </div></a>
    </li>`;
}