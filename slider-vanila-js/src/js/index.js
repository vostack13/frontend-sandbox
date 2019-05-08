require('@babel/polyfill');

const slider = document.getElementById('general-slider');
const sliderContainer = document.getElementById('general-slider__container');
const sliderItems = document.querySelectorAll('.general-slider__item');
const buttonPrev = document.querySelector('.btn__prev');
const buttonNext = document.querySelector('.btn__next');

let maxPositionSlider = sliderContainer.firstElementChild.childElementCount;
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
		return sliderContainer.firstElementChild.style.transform = `translateX(${0}px)`;
	
	if(positionSlider + value < countViewItem - maxPositionSlider)
		return sliderContainer.firstElementChild.style.transform = `translateX(${width * (countViewItem - maxPositionSlider)}px)`;
	
	positionSlider = positionSlider + value;
	transition = width * positionSlider
	sliderContainer.firstElementChild.style.transform = `translateX(${width * positionSlider}px)`;
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
	sliderContainer.firstElementChild.style.transform = `translateX(${transition - posX2}px)`;
}

const dragEnd = event => {
	event.preventDefault();
	event.stopPropagation();

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

	document.body.addEventListener('touchmove', function(e){ e.preventDefault(); }, false);
});

window.addEventListener('resize', setWidthItem);