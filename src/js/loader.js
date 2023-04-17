import { Loading } from 'notiflix/build/notiflix-loading-aio';

showLoadingIndicator();

window.onload = function() {
  hideLoadingIndicator();
};

function showLoadingIndicator() {
  Loading.pulse({
            clickToClose: true,
            svgSize: '100px',
            backgroundColor: 'rgba(17, 17, 17, 0.6)',
            svgColor: '#4f2ee8',
        })
}

function hideLoadingIndicator() {
  Loading.remove();
}
