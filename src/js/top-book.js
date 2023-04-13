
import { BookAPI } from './book-api.js';
import { createBookCard } from './book-card-template.js';

const bookAPI = new BookAPI();

async function renderBooksList() {
  const booksContainer = document.createElement('books-container');

   //очищение контейнера перед загрузкой новых данных
  
  booksContainer.innerHTML = '';

  try {
    // получение списка категорий
    const categories = await bookAPI.getBooksCategoriesList();

    // получение бестселлеров
    const topBooks = await bookAPI.getTopBooks();

    
    for (const category of categories.data) {
      // получение книги с категории
      bookAPI.category = category;
      const books = await bookAPI.getSelectedCategoryBooks();

      // создание заголовка категории
      const categoryTitle = document.createElement('h2');
      categoryTitle.className = 'category-text'
      categoryTitle.innerText = category;
      booksContainer.appendChild(categoryTitle);

      // создание списка книг
      const booksList = document.createElement('ul');
      booksList.className = 'books-list';
      for (const book of books.data) {
        const bookCard = createBookCard(book);
        const bookListItem = document.createElement('li');
        bookListItem.innerHTML = bookCard;
        booksList.appendChild(bookListItem);
      }
      booksContainer.appendChild(booksList);
    }

    // создание заголовка для бестселлера
    const topBooksTitle = document.createElement('h2');
    topBooksTitle.className = 'section-title'
    booksContainer.appendChild(topBooksTitle);

    // создание списка бестселлеров

    const topBooksList = document.createElement('ul');
    topBooksList.className = 'books-list';
    for (const book of topBooks.data) {
      const bookCard = createBookCard(book);
      const bookListItem = document.createElement('li');
      bookListItem.innerHTML = bookCard;
      topBooksList.appendChild(bookListItem);
    }
    booksContainer.appendChild(topBooksList);
  } catch (error) {
    console.error(error);
  }

  // const topBooksBtn = document.createElement('button');
  // topBooksBtn.className = 'btn-default'
}

// renderBooksList();