import axios from 'axios';

export class BookAPI {
  #BASE_URL = 'https://books-backend.p.goit.global/books';

  constructor() {
    this.category = '';
    this.id = '';
  }

  //   Метод для отримання списку категорій (повертає масив з назвами категорій)
  async getBooksCategoriesList() {
    return await axios.get(`${this.#BASE_URL}/category-list`);
  }

  //   Метод для отримання списку бестселлерів по категоріях (повертає масив)
  async getTopBooks() {
    return await axios.get(`${this.#BASE_URL}/top-books`);
  }

  //   Метод для отримання масиву книг з обраної категорії
  async getSelectedCategoryBooks() {
    return await axios.get(`${this.#BASE_URL}/category?category=${this.category}`);
  }

  //   Метод для отримання інформації про книгу за її унікальним ідентифікатором
	async getBookInfo() {
	  // console.log(this.id);
    return await axios.get(`${this.#BASE_URL}/${this.id}`);
  }
}
