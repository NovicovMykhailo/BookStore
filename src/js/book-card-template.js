export function createBookCard(book, delay) {
  const { _id, book_image, title, author } = book;
  return `<li class="book-card" data-aos="flip-left" data-aos-delay="${delay}" data-aos-anchor-placement="top-bottom">
    <a href="#" class="book-card__link">
    <div class="book-card__thumb">
    <img class="book-card__image" src="${book_image}" alt="${author} ${title}" loading="lazy" data-id="${_id}">
    <p class="book-card__notification">Quick view</p>
    </div>
    <div class="book-card__info">
    <p class="info-item__title">${title}</p>
    <p class="info-item__author">${author}</p>
    </div></a>
    </li>`;
}