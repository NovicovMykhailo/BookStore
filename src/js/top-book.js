
import { BookAPI } from './book-api.js';
import { createBookCard } from './book-card-template.js';


const booksContainer = document.querySelector('.books-container');
const booksList = booksContainer.querySelector('.books-list');
const booksListItem = booksList.querySelector('.books-list__item');
const bookCardsList = booksListItem.querySelector('.book-card__list');
const seeMoreBtn = booksListItem.querySelector('.btn-default');

const bookApi = new BookAPI();


function renderBookCards(books) {
  console.log(books)
  const bookCards = books.map((book) => createBookCard(book));
  bookCardsList.innerHTML = bookCards.join('');
}



async function fetchAndRenderBooks() {
  try {
    const response = await bookApi.getTopBooks();
    const books = response.data;
    renderBookCards(books);
  } catch (error) {
    console.error(error);
  }
}

seeMoreBtn.addEventListener('click', async () => {
  try {
    const response = await bookApi.getSelectedCategoryBooks();
    const books = response.data;
    renderBookCards(books);
    
  } catch (error) {
    console.error(error);
  }
});

fetchAndRenderBooks();







// const bookAPI = new BookAPI();
// const container = document.querySelector('.books-container')
// const btn = document.querySelector('.btn-default')


// async function renderBooksList() {

  
//   container.innerHTML = '';

//   try {
//     // получение списка категорий
//     const categories = await bookAPI.getBooksCategoriesList();


//     // получение бестселлеров
//     const topBooks = await bookAPI.getTopBooks();

//     topBooks.data.map(e => {
//       console.log(e.list_name);
//       let list = e.books.map(createBookCard);
//       container.insertAdjacentHTML('beforeend', list.join(''))
//     });

  

    

    
    // for (const category of categories.data) {
    //   // получение книги с категории
    //   bookAPI.category = category;
    //   const books = await bookAPI.getSelectedCategoryBooks();

    //   // создание заголовка категории
    //   const categoryTitle = document.querySelector('block-title');
    //   container.appendChild(categoryTitle);
  

    //   // создание списка книг
    //   const booksList = document.createElement('ul');
    //   for (const book of books.data) {
    //     const bookCard = createBookCard(book);
    //     const bookListItem = document.createElement('li');
    //     bookListItem.innerHTML = bookCard;
    //     booksList.appendChild(bookListItem);
    //   }
    //   container.appendChild(booksList);
    // }

    // // создание заголовка для бестселлера
    // const topBooksTitle = document.createElement('h2');
    // topBooksTitle.className = 'section-title'
    // container.appendChild(topBooksTitle);

    // // создание списка бестселлеров

    // const topBooksList = document.createElement('ul');
    // topBooksList.className = 'books-list';
    // for (const book of topBooks.data) {
    //   const bookCard = createBookCard(book);
    //   const bookListItem = document.createElement('li');
    //   bookListItem.innerHTML = bookCard;
    //   topBooksList.appendChild(bookListItem);
    // }
    // container.appendChild(topBooksList);
  // } catch (error) {
  //   console.error(error);
  // }

  // const topBooksBtn = document.createElement('button');
  // topBooksBtn.className = 'btn-default'
// }

// renderBooksList();