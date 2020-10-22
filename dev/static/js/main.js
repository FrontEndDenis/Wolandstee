const modalList = {
	basket: new bootstrap.Modal(document.getElementById('modal-basket')),
	search: new bootstrap.Modal(document.getElementById('modal-search')),
}

svg4everybody();

function slidersInit() {
	let mainText = ['Бесплатная доставка', 'Скидка на 1-ый заказ', 'Акции месяца', 'Новый Год', 'Текст из массива js'];
	const mainSlider = new Swiper('.main-slider', {
		slidesPerView: 1,
		spaceBetween: 30,
		loop: true,
		autoplay: {
			delay: 3500,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.s-main-slider__pagination',
			clickable: true,
			renderBullet: function (index, className) {
				return `<span class="` + className + `">` + (mainText[index]) + `</span>`;
			}
		}
	})
	const catalogSlider = new Swiper('.catalog-slider', {
		spaceBetween: 24,
		breakpoints: {
			0: {
				slidesPerView: 1,
			},
			576: {
				slidesPerView: 2,
			},
			768: {
				slidesPerView: 3,
			},
			1024: {
				slidesPerView: 4,
			}
		}
	})
}
slidersInit();

document.addEventListener("DOMContentLoaded", function () {
	window.onresize = () => {
		heightCatalogCard()
	};
});

function isMobile() {
	let isMobile = {
		Android: function () { return navigator.userAgent.match(/Android/i); },
		BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
		iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
		Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
		Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
		any: function () {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	}
	if (isMobile.any()) {
		return true
	} else {
		return false
	}
}

// Анимации
function animateCSS(element, animation) {
	return new Promise((resolve, reject) => {
		const animationName = animation;
		const node = (element.nodeType === 1) ? element : document.querySelector(element);

		node.classList.add('animation', ...animationName.split(' '));

		function handleAnimationEnd() {
			node.classList.remove('animation', ...animationName.split(' '));
			resolve('Animation ended');
		}

		node.addEventListener('animationend', handleAnimationEnd, { once: true });
	});
}

// Валидация
(function () {
	window.addEventListener('load', function () {
		var forms = document.getElementsByClassName('needs-validation');
		var validation = Array.prototype.filter.call(forms, function (form) {
			form.addEventListener('submit', function (event) {
				if (form.checkValidity() === false) {
					event.preventDefault();
					event.stopPropagation();
				}
				form.classList.add('was-validated');
			}, false);
		});
	}, false);
})();

// Отслеживаем событие Bootstrap modal window
function eventBsModal(elem, events, fn) {
	document.querySelector(elem).addEventListener(`${events}.bs.modal`, function (e) {
		fn()
	});
}

// Поиск в шапке
function openSearchHeader() {
	const btn = document.querySelector('#open-search-header'),
		bottomLine = document.querySelector('.bottom-line'),
		btnClose = btn.previousElementSibling.querySelector('.search-input__close'),
		input = btn.previousElementSibling.querySelector('input');

	const show = () => {
		bottomLine.classList.add('open-search');
		btn.previousElementSibling.classList.add('active');
		animateCSS(btn.previousElementSibling, 'fade-in')
	}

	const hide = () => {
		bottomLine.classList.remove('open-search');
		btn.previousElementSibling.classList.remove('active');
		input.value = '';
	}

	btn.addEventListener('click', show)
	btnClose.addEventListener('click', hide)
}
openSearchHeader();

// Компания
function catalogListInfo() {
	const elem = document.querySelector('.catalog-list'),
		block = elem.querySelector('.catalog-list__wrap');

	const show = () => {
		elem.classList.add('active');
		animateCSS(block, 'fade-in');
	}

	const hide = () => {
		elem.classList.remove('active');
	}
	elem.addEventListener('mouseenter', show, false);
	elem.addEventListener('mouseleave', hide, false);
}
catalogListInfo();

// Каталог
function catalogMenu() {
	const bottom = document.querySelector('.bottom-line__left'),
		panel = document.querySelector('.bottom-line__navitagion-panel'),
		elems = panel.querySelectorAll('li'),
		block = document.querySelector('.bottom-line__catalog');

	const checkEl = item => {
		if (item.classList.contains('active')) {
			addEl(item)
		} else if (item.classList.contains('spacial')) {
			addEl(item)
			block.classList.remove('active');
		} else {
			addEl(item)
			show();
		}
	}

	const addEl = item => {
		elems.forEach(el => el.classList.remove('active'))
		panel.classList.add('open-catalog');
		item.classList.add('active');
	}

	const hide = item => {
		panel.classList.remove('open-catalog');
		block.classList.remove('active');
		item.classList.remove('active');
	}

	const show = () => {
		block.classList.add('active', 'animation', 'fade-in');
	}

	elems.forEach(elem => {
		elem.addEventListener('mouseenter', function () {
			checkEl(elem);
		}, false);
		bottom.addEventListener('mouseleave', function () {
			hide(elem);
		}, false);
	})
}
catalogMenu();

// Табы
function tabs() {
	const tabs = document.querySelectorAll('.tabs');
	if (tabs.length == 0) return;
	show(document.querySelector('.tabs'), 0);
	tabs.forEach((tab) => {
		const navs = tab.querySelectorAll('.tabs__nav-item');
		navs.forEach((nav, index) => {
			nav.addEventListener('click', (evt) => {
				evt.preventDefault();
				if (!navs[index].classList.contains('active')) {
					show(tab, index);
				}
			});
		});
	});

	function show(parent, id) {
		const navs = parent.querySelectorAll('.tabs__nav-item'),
			contents = parent.querySelectorAll('.tabs__content-item');
		navs.forEach((nav) => nav.classList.remove('active'));
		contents.forEach((content) => content.classList.remove('active'));
		navs[id].classList.add('active');
		contents[id].classList.add('active', 'animation', 'fade-in-scale');
	}
}
tabs();

// Кнопки +- в карточке
function inputNumber() {
	const el = document.querySelectorAll('.input-number');

	el.forEach((e) => {
		const input = e.querySelector('.input-number__field'),
			plus = e.querySelector('.input-number__plus'),
			minus = e.querySelector('.input-number__minus');

		const delStr = item => {
			input.value = parseInt(item.replace(/[^\d]/g, ''));
		}

		const addUnits = item => {
			return item += ' шт.'
		}

		if (input && plus && minus) {
			plus.addEventListener('click', () => {
				delStr(input.value);
				if (input.max && Number(input.value) + 1 <= input.max) {
					input.value = addUnits((Number(input.value) + 1));
				}
			});

			minus.addEventListener('click', () => {
				delStr(input.value);
				(input.min && Number(input.value) - 1 >= input.min) ? input.value = addUnits((Number(input.value) - 1)) : input.value = 1 + ' шт.'

			});

			input.addEventListener('input', () => {
				delStr(input.value);
				input.value = input.value.replace(/[^0-9+]/, '');
				if (input.max && Number(input.value) > input.max) {
					input.value = input.max;
				} else if (input.value === 'aN') {
					input.value = '';
				}
			});
			input.addEventListener('change', () => {
				input.value = input.value + ' шт.';
			});
		}
	});
}
inputNumber();

// Сброс текста в поиске
function resetSearch() {
	const parent = document.querySelectorAll('.search-input--reset');
		
	const addReset = elem => {
		const input = elem.querySelector('input'),
			btnReset = elem.querySelector('.search-input__reset');

		(input.value != '') ? btnReset.classList.add('reset') : btnReset.classList.remove('reset')

		btnReset.addEventListener('click', () => {
			input.value = '';
			input.focus();
			btnReset.classList.remove('reset');
		})
	}

	parent.forEach(item => {
		item.addEventListener('input', () => addReset(item))
	});
}
resetSearch()

// Корзина
class Basket {
	constructor(className) {
		this.element = document.querySelector(className);
	}

	show(n, classElem) {
		const sections = this.element.querySelectorAll(classElem);

		this.hideAll(classElem);

		sections[n].classList.add('show-section', 'animation', 'fade-in');
	}

	hideAll(classElem) {
		const sections = this.element.querySelectorAll(classElem);

		sections.forEach((section) => {
			section.classList.remove('show-section');
		});
	}
}

const parent = document.querySelector('.modal-basket'),
	section = parent.querySelectorAll('.modal-basket__section'),
	item = parent.querySelectorAll('.modal-basket__basket-item'),
	request = parent.querySelector('.modal-basket__request'),
	clearList = parent.querySelector('.modal-basket__clear-list'),
	yes = parent.querySelector('.modal-basket__yes'),
	no = parent.querySelector('.modal-basket__no'),
	prevBasket = parent.querySelector('.modal-basket__prev-basket'),
	counter = parent.querySelector('.modal-basket__count-product'),
	delCard = document.querySelectorAll('.basket-card__close');

let count = 0,
	countSec = 0;

window.basket = new Basket('.modal-basket');



function basketApp() {
	document.addEventListener('changeBasket', (evt) => {
		const cards = document.querySelectorAll('.basket-card');

		counter.textContent = `${cards.length} товара`;

		if (cards.length > 0) {
			basket.show(countSec, '.modal-basket__section');
			basket.show(count, '.modal-basket__basket-item');
		} else {
			basket.show(countSec, '.modal-basket__section');
			basket.show(2, '.modal-basket__basket-item');
			counter.textContent = `Нет товаров`;
		}
	});
	basket.show(0, '.modal-basket__section')
	basket.show(0, '.modal-basket__basket-item')
	document.dispatchEvent(new Event('changeBasket'));
}

basketApp();

clearList.addEventListener('click', () => {
	count++;
	basket.show(count, '.modal-basket__basket-item');
});

delCard.forEach((del) => {
	del.addEventListener('click', (evt) => {
		evt.preventDefault();

		del.closest('.basket-card').remove();

		document.dispatchEvent(new Event('changeBasket'));
	});
});

yes.addEventListener('click', (evt) => {
	evt.preventDefault();

	const cards = document.querySelectorAll('.basket-card');

	cards.forEach(card => card.remove());

	document.dispatchEvent(new Event('changeBasket'));
});

no.addEventListener('click', () => {
	count--;
	basket.show(count, '.modal-basket__basket-item');

	document.dispatchEvent(new Event('changeBasket'));
});

request.addEventListener('click', () => {
	countSec++;
	basket.show(countSec, '.modal-basket__section');
})

prevBasket.addEventListener('click', () => {
	countSec--;
	basket.show(countSec, '.modal-basket__section');
});


// Custom select
function select() {
	let selectHeader = document.querySelectorAll('.select__header'),
		selectItem = document.querySelectorAll('.select__item');

	selectHeader.forEach(item => {
		item.addEventListener('click', selectToggle)
	});
	selectItem.forEach(item => {
		item.addEventListener('click', selectChoose)
	});
	function selectToggle() {
		this.parentElement.classList.toggle('active');
	}
	function selectChoose() {
		let text = this.innerText,
			select = this.closest('.select'),
			currentText = select.querySelector('.select__text');
		currentText.setAttribute('value', text)
		currentText.innerText = text;
		select.classList.remove('active');
	}
};

select();

function inputFile() {
	const inputFile = document.querySelectorAll('.input-file');

	const processing = elem => {
		const input = elem.querySelector('input'),
			file = input.files[0],
			txt = elem.querySelector('.input-file__txt'),
			sizeTxt = elem.querySelector('.input-file__size'),
			resetBtn = elem.querySelector('.input-file__reset'),
			parts = file.name;

		const reset = e => {
			e.preventDefault();
			e.stopPropagation();
			if (input.value) {
				txt.innerText = 'Добавить файл';
				sizeTxt.innerText = 'до 10Mb';
				elem.classList.remove('error', 'add-file')
				input.value = '';
			}
		}

		let fileSize = parseFloat((file.size / 1024 ** 2).toFixed(4));

		if (fileSize > 10) {
			elem.classList.add('error', 'add-file');
			txt.innerText = parts;
			sizeTxt.innerText = 'Файл слишком большой';
			return
		} else {
			elem.classList.remove('error');
			elem.classList.add('add-file')
		}

		resetBtn.addEventListener('click', reset);

		sizeTxt.innerText = fileSize + 'Mb';
		txt.innerText = parts;
	}

	inputFile.forEach(item => {
		item.addEventListener('change', () => processing(item));
	});
}
inputFile()

// Аккардион
function accordion() {
	const acc = document.querySelectorAll('.accordion');
	acc.forEach(item => {
		let panel = item.nextElementSibling;
		panel.style.maxHeight = 0
		item.addEventListener('click', (evt) => {
			evt.preventDefault();
			item.classList.toggle('active');
			if (!panel.style.maxHeight) {
				panel.style.maxHeight = panel.scrollHeight + 'px';
				setTimeout(() => {
					panel.style.maxHeight = 0;
				}, 20);
			} else {
				panel.style.maxHeight = panel.scrollHeight + 'px';
				panel.addEventListener('transitionend', () => {
					panel.style.maxHeight = null;
				}, { once: true });
			}
		});
	})
}
accordion();

// Кнопка открытия мобильных кнопок поиска и корзины
function openBasketBtn(btnClass, icon, modalListElem, modalClass) {
	const btn = document.querySelector(btnClass);

	const open = () => {
		btn.classList.add('open');
		animateCSS(btn.querySelector('.icon-close'), 'fade-in')
	}

	const close = () => {
		btn.classList.remove('open');
		animateCSS(btn.querySelector(icon), 'fade-in')
	}

	btn.addEventListener('click', () => {
		(btn.classList.contains('open')) ? close() : open();
		modalListElem.toggle();
	})
	eventBsModal(modalClass, 'hide', close)
}
openBasketBtn('#open-basket', '.icon-basket', modalList.basket, '#modal-basket')
openBasketBtn('#open-search', '.icon-search', modalList.search, '#modal-search')

// Открытие меню
function mobileMenu() {
	const menu = document.querySelector('.mobile-menu'),
		over = menu.querySelector('.mobile-menu__overlay'),
		menuBtn = document.querySelector('#mobile-menu');

	const showMenu = () => {
		document.querySelector('body').classList.add('modal-open');
		menuBtn.classList.toggle('active');
		menu.style.right = '0';
		over.classList.add('active');
		animateCSS(over, 'fade-in');
	}

	const closeMenu = () => {
		document.querySelector('body').classList.remove('modal-open');
		menu.style.right = '-100%';
		menuBtn.classList.remove('active');
		over.classList.remove('active');
	}

	menuBtn.addEventListener('click', () => {
		(menuBtn.classList.contains('active')) ? closeMenu() : showMenu();
	});
	over.addEventListener('click', () => {
		closeMenu();
	})
}

mobileMenu()

// Открытие каталога в мобильном меню
function catalogMobMenu() {
	const items = document.querySelectorAll('.catalog-m-menu__item a'),
		prev = document.querySelectorAll('.catalog-m-menu__prev');

	const show = item => {
		let block = item.nextElementSibling;
		if (!block) return
		block.style.transform = 'translate(0)';
	}

	const fade = item => {
		let block = item.closest('.catalog-m-menu__sub')
		block.style.transform = 'translate(100%)';
	}

	items.forEach(item => {
		item.addEventListener('click', () => show(item))
	});

	prev.forEach(item => {
		item.addEventListener('click', () => fade(item))
	})
}
catalogMobMenu();

// Высота скролла карточек Каталога
function heightCatalogCard() {
	const cards = document.querySelectorAll('.catalog-card');

	const calcHeight = elem => {
		const hiddenCard = elem.querySelector('.catalog-card__hidden'),
			scrollList = elem.querySelector('.catalog-card__list'),
			titleCard = elem.querySelector('.catalog-card__h-title');
		
		let heightCalc = 0;

		heightCalc = hiddenCard.offsetHeight - ((titleCard.offsetHeight + 20) + 48);
		scrollList.style.maxHeight = heightCalc + 'px';
	}

	cards.forEach(item => {
		calcHeight(item)
	})
}
heightCatalogCard()