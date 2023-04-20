const { formToJSON } = require("axios");

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
		buttonGroup: document.querySelector('.btn-group'),
		inputNameFormJS: document.querySelector('.input-name'),
	};
}
(() => {
	let refs = refsEl();
	refs.openModalBtn.addEventListener('click', toggleModal);
	refs.closeModalBtn.addEventListener('click', toggleModal);
	refs.mobileBtn.addEventListener('click', toggleModal);
	refs.form.addEventListener('submit', (e) => {
		e.preventDefault()
		toggleModal()



	})

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
	const signInBtn = refs.buttonGroup.children[0];
	const signUpBtn = refs.buttonGroup.children[1];

	if (targetChoiceBtn !== 'sign-up') {
		refs.inputNameFormJS.disabled = true;
		refs.nameForm.style.display = 'none';
		refs.form.style.marginTop = '20px';
		refs.submitBtn.textContent = 'Sign In';
		signInBtn.classList.remove('active-form');
		signUpBtn.classList.add('active-form');
	} else {
		refs.inputNameFormJS.disabled = false;
		refs.nameForm.style.display = 'inline-block';
		refs.form.style.marginTop = '0px';
		refs.submitBtn.textContent = 'Sign Up';
		signUpBtn.classList.remove('active-form');
		signInBtn.classList.add('active-form');
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

// dark Theme
