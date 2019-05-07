const slider = document.getElementById('general-slider');
const sliderContainer = document.getElementById('general-slider__container');
const sliderItem = document.getElementById('general-slider__item');
const buttonPrev = document.querySelector('.btn__prev');
const buttonNext = document.querySelector('.btn__next');

let width = 0;
let countViewItem = 0;
let positionSlider = 0;
let maxPositionSlider = sliderContainer.firstElementChild.childElementCount;
let translate = 0;

const setWidthItem = () => {
	if (window.innerWidth > 1024)
		countViewItem = 3
	
	if (window.innerWidth >= 768 && window.innerWidth <= 1024)
		countViewItem = 2
	
	if (window.innerWidth < 768)
		countViewItem = 1
	
	width = sliderContainer.offsetWidth / countViewItem;
	sliderContainer.style.cssText = `--width-item: ${width}px`;
	slider.style.cssText = `--height-container: ${width * 4 / 3}px`;
}

const shiftSlider = value => {
	if (positionSlider + value > 0 || positionSlider + value < countViewItem - maxPositionSlider)
		return;
	
	positionSlider = positionSlider + value;
	sliderContainer.firstElementChild.style.cssText = `--translate: translateX(${width * positionSlider}px)`;
}

window.addEventListener('DOMContentLoaded', setWidthItem);
window.addEventListener('resize', setWidthItem);
buttonPrev.addEventListener('click', () => shiftSlider(-1))
buttonNext.addEventListener('click', () => shiftSlider(1))

// Touch events
let posX1 = 0;
let posX2 = 0;
let posInitial;
let posFinal;

const dragStart = event => {
	// event.stopPropagation();
	event.preventDefault();
	posInitial = event.touches[0].clientX;

	posX1 = event.touches[0].clientX;

	// console.log('posInitial', posInitial);
}

const dragAction = event => {
	// event.stopPropagation();
	// event.preventDefault();
	// console.log(event.touches[0]);

	posX2 = posX1 - event.touches[0].clientX;
	posFinal = event.touches[0].clientX;

	// console.log('dragAction ', translate);
	
	// sliderContainer.firstElementChild.style.cssText = `--translate: translateX(${sliderContainer.firstElementChild.offsetLeft - posX2}px)`;
}

const dragEnd = event => {
	// posFinal = sliderContainer.offsetLeft;

	if (posInitial - posFinal > 0) {
		touchValue = Math.round(((posInitial - posFinal) / width) * -1);
		console.log('posFinal', touchValue - 1);
		shiftSlider(touchValue - 1);
	} else {
		touchValue = Math.round((posFinal - posInitial) / width);
		// console.log('posFinal', touchValue - 1);
		shiftSlider(touchValue + 1);
	}


	// positionSlider = positionSlider + touchValue + 1;
	
	// console.log('touchValue ', touchValue);
	// console.log('positionSlider ', positionSlider);
	// if (touchValue < 0) {
	// } else if (touchValue > 0) {
	// 	shiftSlider(touchValue);
	// } else {
	// 	shiftSlider(0)
	// }
}

sliderContainer.firstElementChild.addEventListener('touchstart', event => dragStart(event));
sliderContainer.firstElementChild.addEventListener('touchmove', event => dragAction(event));
sliderContainer.firstElementChild.addEventListener('touchend', event => dragEnd(event));