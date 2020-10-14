svg4everybody();

function sliderInit() {
	let text = ['Бесплатная доставка', 'Скидка на 1-ый заказ', 'Акции месяца', 'Новый Год', 'Текст из массива js']
	const mainSlider = new Swiper('.main-slider', {
		slidesPerView: 1,
		spaceBetween: 30,
		loop: true,
		// autoplay: {
		// 	delay: 3500,
		// 	disableOnInteraction: false,
		// },
		pagination: {
			el: '.s-main-slider__pagination',
			clickable: true,
			renderBullet: function (index, className) {
				return '<span class="' + className + '">' + (text[index]) + '</span>';
			}
		}
	})
}
sliderInit();

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
function animation(item, anmClass) {
	item.classList.add(anmClass);
	item.addEventListener('animationend', () => {
		item.classList.remove(anmClass);
	}, { once: true });
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

// Поиск в шапке
function openSearchHeader() {
	const btn = document.querySelector('#open-search-header'),
		bottomLine = document.querySelector('.bottom-line'),
		btnClose = btn.previousElementSibling.querySelector('.search-input__close'),
		input =  btn.previousElementSibling.querySelector('input');

	const show = () => {
		bottomLine.classList.add('open-search');
		btn.previousElementSibling.classList.add('active');
		animation(btn.previousElementSibling, 'fade-in');
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
		animation(block, 'fade-in');
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
		if(item.classList.contains('active')) {
			addEl(item)
		} else if(item.classList.contains('spacial')) {
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
		block.classList.add('active');
		animation(block, 'fade-in');
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
		contents[id].classList.add('active')
		animation(contents[id], 'fade-in-scale');
	}
}
tabs();