import { countPages } from './shopping-list__pagination';

// проверить, приходит число или строка
// не забыть перерендировать

export const numericBtnFunc = curP => {
  const stringMore = '...';
  const array = [];

  if (countPages === 2) {
    array.push('1', '2');
  }

  if (countPages === 3) {
    array.push('1', '2', '3');
  }

  if (window.screen.width < 768) {
    if (countPages > 3) {
      if (curP === countPages) {
        array.push(stringMore, String(curP - 1), String(curP));
      }

      if (curP + 1 === countPages) {
        array.push(stringMore, String(curP), String(curP + 1));
      }

      if (countPages - curP === 2) {
        array.push(String(curP), String(curP + 1), String(curP + 2));
      }

      if (countPages - curP > 2) {
        array.push(String(curP), String(curP + 1), stringMore);
      }
    }

    return array;
  }

  if (countPages === 4) {
    array.push('1', '2', '3', '4');
  }

  if (countPages > 4) {
    if (curP === countPages) {
      array.push(stringMore, String(curP - 2), String(curP - 1), String(curP));
    }

    if (curP + 1 === countPages) {
      array.push(stringMore, String(curP - 1), String(curP), String(curP + 1));
    }

    if (curP + 2 === countPages) {
      array.push(stringMore, String(curP), String(curP + 1), String(curP + 2));
    }

    if (countPages - curP === 3) {
      array.push(
        String(curP),
        String(curP + 1),
        String(curP + 2),
        String(curP + 3)
      );
    }

    if (countPages - curP > 2) {
      array.push(String(curP), String(curP + 1), String(curP + 2), stringMore);
    }
  }

  return array;
};
