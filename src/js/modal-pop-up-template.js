export function createModalPopUpCard(book) {
  const { _id, list_name, author, book_image, description, buy_links } = book;
  const urls = buy_links
  .filter(buyLink => ["Amazon", "Apple Books", "Bookshop"].includes(buyLink.name))
  .map(buyLink => buyLink.url);
  return `<div id=${_id} data-fancybox="modal" class="modal" style="display:none">
    <div class="modal__pop-up">
      <button class="pop-up__btn-close" type="button">
        <svg class="btn-close-icon" width="32" height="32">
          <use href="./images/svg-sprite.svg#x-close-icon"></use>
        </svg>
      </button>
      <div class="pop-up__book">
        <div class="pop-up__book-container">
          <img class="book__image" src="${book_image}" alt="">
          <div>
            <div>
              <h2 class="book__list-name info-item__title">${list_name}</h2>
              <p class="book__author info-item__author">${author}</p>
            </div>
            <p class="book__description">${description}</p>
            <ul class="book__list">
              <li class="book__item">
                <a class="book__buy-links" href="${buyLink.url[0]}" target="_blank" rel="noopener noreferrer" aria-label="Amazon">
                  <picture class="buy-links__icon">
                    <source srcset="./images/BookStoreIcons/amazon.png 1x, ./images/BookStoreIcons/amazon-2x.png 2x">
                    <img src="./images/BookStoreIcons/amazon.png" alt="Amazon">
                  </picture>
                </a>
              </li>
              <li class="book__item">
                <a class="book__buy-links" href="${buyLink.url[1]}" target="_blank" rel="noopener noreferrer" aria-label="Apple Books">
                  <picture class="buy-links__icon">
                    <source
                      srcset="./images/BookStoreIcons/apple-books.png 1x, ./images/BookStoreIcons/apple-books-2x.png 2x">
                    <img src="./images/BookStoreIcons/apple-books.png" alt="Apple Books">
                  </picture>
                </a>
              </li>
              <li class="book__item">
                <a class="book__buy-links" href="${buyLink.url[2]}" target="_blank" rel="noopener noreferrer" aria-label="Bookshop">
                  <picture class="buy-links__icon">
                    <source
                      srcset="./images/BookStoreIcons/book-shop.png 1x, ./images/BookStoreIcons/book-shop-2x.png 2x">
                    <img src="./images/BookStoreIcons/book-shop.png" alt="Bookshop">
                  </picture>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <button class="pop-up__btn-add btn-default" type="button">add to shopping list</button>
      <button class="pop-up__btn-remove btn-default visually-hidden" type="button">remove from the shopping list</button>
      <p class="pop-up__text-info visually-hidden">Сongratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”.
      </p>
    </div>
  </div>
`;
}