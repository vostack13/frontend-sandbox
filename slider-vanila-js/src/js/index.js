require('@babel/polyfill');

const slider = document.getElementById('general-slider');
const sliderContainer = document.getElementById('general-slider__container');
const sliderList = document.querySelector('.general-slider > .container > .list');
const sliderItems = document.querySelectorAll('.general-slider__item');
const buttonPrev = document.querySelector('.general-slider > .btn__arrow-left');
const buttonNext = document.querySelector('.general-slider > .btn__arrow-right');

let maxPositionSlider = sliderList.childElementCount;
let transition = 0;
let width = 0;
let countViewItem = 0;
let positionSlider = 0;
let translate = 0;
let posX1 = 0;
let posX2 = 0;
let posInitial;
let posFinal;

const setWidthItem = () => {
	if (window.innerWidth > 1024)
		countViewItem = 3
	
	if (window.innerWidth >= 768 && window.innerWidth <= 1024)
		countViewItem = 2
	
	if (window.innerWidth < 768)
		countViewItem = 1
	
	width = sliderContainer.offsetWidth / countViewItem;
	
	[...sliderItems].map(I => {
		I.style.width = `${width}px`;
	})
	
	slider.style.height = `${width * 4 / 3}px`;
}

const shiftSlider = value => {
	if (positionSlider + value > 0)
		return sliderList.style.transform = `translateX(${0}px)`;
	
	if(positionSlider + value < countViewItem - maxPositionSlider)
		return sliderList.style.transform = `translateX(${width * (countViewItem - maxPositionSlider)}px)`;
	
	positionSlider = positionSlider + value;
	transition = width * positionSlider
	sliderList.style.transform = `translateX(${width * positionSlider}px)`;
}

const dragStart = event =>  {
	if (event.type == 'touchstart')
		posInitial = parseInt(event.changedTouches[0].clientX);
	else {
		posInitial = parseInt(event.clientX);
		document.onmouseup = dragEnd;
		document.onmousemove = dragAction;
	}
}

const dragAction = event => {
	if (event.type == 'touchmove') {
		posX2 = posInitial - parseInt(event.changedTouches[0].clientX);
		posFinal = parseInt(event.changedTouches[0].clientX);
	}
	else {
		event.preventDefault();
		posX2 = posInitial - parseInt(event.clientX);
		posFinal = parseInt(event.clientX);
	}

	sliderList.style.transform = `translateX(${transition - posX2}px)`;
}

const dragEnd = event => {
	if (posInitial - posFinal > 0) {
		touchValue = Math.round((((posInitial - posFinal) * 2) / width) * -1);
		shiftSlider(touchValue);
	} else {
		touchValue = Math.round(((posFinal - posInitial) * 2) / width);
		shiftSlider(touchValue);
	}

	document.onmouseup = null;
	document.onmousemove = null;
}

window.addEventListener('DOMContentLoaded', function() {
	setWidthItem();

	buttonPrev.addEventListener('click', () => shiftSlider(-1))
	buttonNext.addEventListener('click', () => shiftSlider(1))

	sliderList.onmousedown = dragStart;
	sliderList.addEventListener('touchstart', dragStart, false);
	sliderList.addEventListener('touchmove', dragAction, false);
	sliderList.addEventListener('touchend', dragEnd, false);

	document.body.addEventListener('touchmove', {});
	window.addEventListener('resize', setWidthItem);
});
