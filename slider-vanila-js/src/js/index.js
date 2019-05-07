const slider = document.getElementById('general-slider');
const sliderContainer = document.getElementById('general-slider__container');
const sliderItem = document.getElementById('general-slider__item');
const buttonPrev = document.querySelector('.btn__prev');
const buttonNext = document.querySelector('.btn__next');

let transition = 0;
let width = 0;
let countViewItem = 0;
let positionSlider = 0;
let maxPositionSlider = sliderContainer.firstElementChild.childElementCount;
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
	sliderContainer.style.cssText = `--width-item: ${width}px`;
	slider.style.cssText = `--height-container: ${width * 4 / 3}px`;
}

const shiftSlider = value => {
	
	// if (positionSlider + value > 0 || positionSlider + value < countViewItem - maxPositionSlider)
	// return;

	if (positionSlider + value > 0) {
		console.log('>0');
		
		return sliderContainer.firstElementChild.style.cssText = `--translate: translateX(${0}px)`;
	}
	
	if(positionSlider + value < countViewItem - maxPositionSlider) {
		console.log('< 0');
		return sliderContainer.firstElementChild.style.cssText = `--translate: translateX(${width * (countViewItem - maxPositionSlider)}px)`;
	}
	
	positionSlider = positionSlider + value;
	// console.log('positionSlider', positionSlider);
	transition = width * positionSlider
	sliderContainer.firstElementChild.style.cssText = `--translate: translateX(${width * positionSlider}px)`;
}

const dragStart = event =>  {
	event.preventDefault();
	event.stopPropagation();
	posInitial = parseInt(event.changedTouches[0].clientX);
}

const dragAction = event => {
	event.preventDefault();
	event.stopPropagation();
	posX2 = posInitial - parseInt(event.changedTouches[0].clientX);
	posFinal = parseInt(event.changedTouches[0].clientX);

	sliderContainer.firstElementChild.style.cssText = `--translate: translateX(${transition - posX2}px)`;
}

const dragEnd = event => {
	event.preventDefault();
	event.stopPropagation();
	// console.log('posInitial', posInitial);
	// console.log('posFinal', posFinal);
	if (posInitial - posFinal > 0) {
		
		touchValue = Math.round((((posInitial - posFinal) * 2) / width) * -1);
		console.log('touchValue <-', touchValue);
		shiftSlider(touchValue);
	} else {
		touchValue = Math.round(((posFinal - posInitial) * 2) / width);
		console.log('touchValue ->', touchValue);
		shiftSlider(touchValue);
	}
}

window.addEventListener('DOMContentLoaded', function() {
	setWidthItem();

	buttonPrev.addEventListener('click', () => shiftSlider(-1))
	buttonNext.addEventListener('click', () => shiftSlider(1))

	sliderContainer.firstElementChild.addEventListener('touchstart', dragStart, false);
	sliderContainer.firstElementChild.addEventListener('touchmove', dragAction, false);
	sliderContainer.firstElementChild.addEventListener('touchend', dragEnd, false);

	document.body.addEventListener('touchmove', function(e){ e.preventDefault(); }, {passive: false});
});

window.addEventListener('resize', setWidthItem);