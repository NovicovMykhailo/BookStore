const booksCheckingInLocal =
  localStorage.getItem('shopping-list') === null
    ? []
    : JSON.parse(localStorage.getItem('shopping-list')); // если есть объекта => парсит из локал



export default function addToLocalStorage(bookObject) {

  //добавляет в переменную
const arrayOfBookObj = [];
  arrayOfBookObj.push(bookObject);
     localStorage.setItem('shopping-list', JSON.stringify(arrayOfBookObj));

  


  if (localStorage.getItem('shopping-list') !== null) {
    if (JSON.parse(localStorage.getItem('shopping-list')).map((obj) => { bookObject.title === obj })) {
      console.log('You already have this Book');
   
    } else {
 
   
      
    }
    

  }
 

  // if (
  //   arrayOfBookObj.length === 0 ||
  //   !arrayOfBookObj.find((obj, i) => (obj._id))
  // ) {
  //   arrayOfBookObj.unshift(bookObject);
  //   localStorage.setItem('shopping-list', JSON.stringify(arrayOfBookObj));
  // }
}
