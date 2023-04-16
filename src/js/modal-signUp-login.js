(() => {
  const refs = {
    // openModalBtn: document.querySelector('.header__singup-btn'),
    closeModalBtn: document.querySelector("[data-modal-close]"),
    modal: document.querySelector('[data-modal]'),
  };

  // refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  function toggleModal() {
    document.body.classList.toggle("modal-open");
    refs.modal.classList.toggle("is-hidden");
  }
})
  ();



