function refsEl() {
  return {
    openModalBtn: document.querySelector('.header__singup-btn'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    formContainer: document.querySelector('.form-container'),
    btnGrp: document.querySelectorAll('.btn-group'),
    backdrop: document.querySelector('.modal__backdrop'),
    nameForm: document.querySelector('.form-label-name'),
    form: document.querySelector('.form-container > form'),
    submitBtn: document.querySelector('.btn-signup'),
    mobileBtn: document.querySelector('.header__singup-btn-mob-menu'),
  };
};
(() => {
  let refs = refsEl()
  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);
  refs.mobileBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    const refs = refsEl();
    document.body.classList.toggle('modal-open');
    document.addEventListener('keydown', exitViaEsc);

    refs.backdrop.addEventListener('click', closeOnClick);
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
  const refs = refsEl();
  let targetChoiceBtn = e.target.dataset.type;

  if (targetChoiceBtn !== 'sign-up') {
    refs.nameForm.style.display = 'none';
    refs.form.style.marginTop = '20px';
    refs.submitBtn.textContent = 'Sign In';
  } else {
    refs.nameForm.style.display = 'inline-block';
    refs.form.style.marginTop = '0px';
    refs.submitBtn.textContent = 'Sign Up';
  }
}

function closeOnClick(e) {
  const refs = refsEl();
  if (e.target.className === 'modal__backdrop') {
    refs.modal.classList.toggle('is-hidden');
    refs.formContainer.classList.toggle('is-hidden');
    refs.backdrop.removeEventListener('click', closeOnClick);
    return;
  }
}

function exitViaEsc(e) {
  const refs = refsEl();
  if (e.key === 'Escape') {
    refs.modal.classList.toggle('is-hidden');
    refs.formContainer.classList.toggle('is-hidden');
    refs.backdrop.removeEventListener('click', closeOnClick);
    document.removeEventListener('keydown', exitViaEsc);
    return;
  }
}
