export function createBookCard(book) {
  const { book_image, title, author } = book;
  return `<li class="book-card">
    <img class="book-card__image" src="${book_image}", alt="${author} ${title}" loading="lazy" />
    <div class="book-card__info">
    <p class="info-item__title">${title}</p>
    <p class="info-item__author">${author}</p>
    </div>
    </li>`;
}
// для заголовка будет дописн метод сокращения с добавлением ...