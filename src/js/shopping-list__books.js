export const books =
  localStorage.getItem('shopping-list') === null
    ? []
    : JSON.parse(localStorage.getItem('shopping-list'));
