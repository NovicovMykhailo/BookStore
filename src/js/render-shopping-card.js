import amazon1x from '../images/BookStoreIcons/amazon.png';
import amazon2x from '../images/BookStoreIcons/amazon-2x.png';
import appleBooks1x from '../images/BookStoreIcons/apple-books.png';
import appleBooks2x from '../images/BookStoreIcons/apple-books-2x.png';
import bookshop1x from '../images/BookStoreIcons/book-shop.png';
import bookshop2x from '../images/BookStoreIcons/book-shop-2x.png';
import spriteSvgEls from '../images/svg-sprite.svg';

function isAvailableDescription (description){
  if (description === '') {
    return "Sorry, we can't find appropriate description :(";
  }
  return description;
};



export default function murkupForTabletAndDesktop({
  author,
  title,
  book_image,
  buy_links,
  description,
}) {
  return `<li class="shopping-list__card">
  <div class="img-autor-container">
    <div class="image-container">
      <img
        src="${book_image}"
        alt="book cover"
        class="shopping-list__image"
      />
      <h3 class="shopping-list__author">${author}</h3>
    </div>
    <div class="card-container">
      <h2 class="shopping-list__title-card">${title}</h2>
      <p class="shopping-list__sub-title">Middle Grade Paperback Monthly</p>
      <ul class="shopping-list__links">
        <li class="shopping-list__link-item">
          <a
            href="${buy_links[0].url}"
            class="shopping-list__link"
            target="blank"
          >
            <img
              class="buy-links__icon amazon"
              src="${amazon2x}" srcset="${amazon1x} 1x, ${amazon2x} 2x" 
              width="48"
              alt="platform-icon"
              class="shopping-list__link-icon"
            />
          </a>
        </li>
        <li class="shopping-list__link-item">
          <a
            href="${buy_links[1].url}"
            class="shopping-list__link"
            target="blank"
          >
            <img
              class="buy-links__icon"
              src="${appleBooks2x}" srcset="${appleBooks1x} 1x, ${appleBooks2x} 2x" 
              width="28"
              alt="platform-icon"
              class="shopping-list__link-icon"
            />
          </a>
        </li>
        <li class="shopping-list__link-item">
          <a
            href="${buy_links[4].url}"
            class="shopping-list__link"
            target="blank"
          >
            <img
              class="buy-links__icon"
              src="${bookshop2x}" srcset="${bookshop1x} 1x, ${bookshop2x} 2x" 
              width="32"
              alt="platform-icon"
              class="shopping-list__link-icon"
            />
          </a>
        </li>
      </ul>
    </div>
  </div>
  <p class="shopping-list__description">${isAvailableDescription(
    description
  )}</p>
  <button class="btn">
    <svg class="trash-icon" width="16" height="16">
      <use href="${spriteSvgEls}#trash-icon"></use>
    </svg>
  </button>
</li>`;
}
