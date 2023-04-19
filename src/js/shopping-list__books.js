export function books() {
    if (localStorage.getItem('shopping-list') === null)
        return [];
    else {
        JSON.parse(localStorage.getItem('shopping-list'));
    }
}
