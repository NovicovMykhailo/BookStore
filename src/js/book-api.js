export class BookAPI {
  #BASE_URL = 'https://books-backend.p.goit.global/books';

  //   Метод для отримання списку категорій (повертає масив з назвами категорій)
  getBookCategoriesList() {
    return fetch(`${this.#BASE_URL}/category-list`)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(data => data.map(category => category.list_name));
  }

  //   Метод для отримання списку бестселлерів по категоріях (повертає масив)
  getTopBooks() {
    return fetch(`${this.#BASE_URL}/top-books`)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(data => {
        const category = data.list_name;
        const topBooks = data.books.map(book => ({
          bookID: book._id,
          image: book.book_image,
          author: book.author,
          title: book.title,
        }));
        return category, topBooks;
      });
  }

  //   Метод для отримання масиву книг з обраної категорії
  getSelectedCategoryBooks(selectedCategory) {
    return fetch(`${this.#BASE_URL}/category?category=${selectedCategory}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(data =>
        data.books.map(book => ({
          bookID: book._id,
          image: book.book_image,
          author: book.author,
          title: book.title,
        }))
      );
  }

  //   Метод для отримання інформації про книгу за її унікальним ідентифікатором
  getBookInfo(bookID) {
    return fetch(`${this.#BASE_URL}/${bookID}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(data => ({ _id, list_name, author, title, book_image, description, buy_links } = data));
  }
}
