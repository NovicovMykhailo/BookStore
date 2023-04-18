(() => {
  const refs = {
    openModalBtn: document.querySelector('.header__singup-btn'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    formContainer: document.querySelector('.form-container'),
    btnGrp: document.querySelectorAll('.btn-group'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    document.body.classList.toggle('modal-open');
    refs.modal.classList.toggle('is-hidden');
    refs.formContainer.classList.toggle('is-hidden');

    if (document.body.classList.contains('modal-open')) {
      refs.btnGrp.forEach(e => e.addEventListener('click', onClick));
    } else {
      refs.btnGrp.forEach(e => e.removeEventListener('click', onClick));
    }
  }
})();

// sign-in fn
function onClick(e) {
  refs = {
    nameForm: document.querySelector('.form-label-name'),
    formContainer: document.querySelector('.form-container > form'),
    submitBtn: document.querySelector('.btn-signup'),
  };

  let targetChoiceBtn = e.target.dataset.type;

  if (targetChoiceBtn !== 'sign-up') {
    refs.nameForm.style.display = 'none';
    refs.formContainer.style.marginTop = '20px';
    refs.submitBtn.textContent = 'Sign In';
  } else {
    refs.nameForm.style.display = 'inline-block';
    refs.formContainer.style.marginTop = '0px';
    refs.submitBtn.textContent = 'Sign Up';
  }
}
