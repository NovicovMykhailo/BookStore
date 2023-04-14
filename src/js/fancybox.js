import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import { createModalPopUpCard } from './modal-pop-up-template';

const modalOptions = {
	on: {
		close: () => {
			setTimeout(deleteMarkup, 1000);
		},
	},
};

// refs.pointers.forEach((event, key, array) => {
// 	event.addEventListener("click", () => {
// 		createModalPopUpCard(hotels[key]), Fancybox.show([{ src: `#${hotels[key].id}`, type: "inline" }], modalOptions);
// 	});
// });

function deleteMarkup() {
	const el = document.querySelector(".modal");
	el.parentElement.removeChild(el);
}