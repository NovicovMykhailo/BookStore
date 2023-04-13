import { BookAPI } from './book-api.js';
import { createBookCard } from './book-card-template.js';

const bookAPI = new BookAPI();

async function renderBooksList() {
  const booksContainer = document.createElement('books-container');
  //очищение контейнера перед загрузкой новых данных
    
  booksContainer.innerHTML = '';

  try {
    // получение бестселлеров
      
      const topBooks = await bookAPI.getTopBooks();
      
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
}

// renderBooksList();