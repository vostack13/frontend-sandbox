require('@babel/polyfill');
import _ from "lodash";

const apiUrl = 'http://we.pena-app.ru';
let stateApp = {
	timeRacing: 0,
	cars: [],
};

const getCars = async () => {
	return new Promise((resolve, reject) => {
		setTimeout(async() => {
			const data = await fetch(`${apiUrl}/rcrtng/api/cars/`, {
				method: 'GET',
				mode: 'cors'
			}).then(res => res.json());

			resolve(data);
		}, 2000);
	});
};

const makeCar = (car, configImg, trackWidth) => {
	const carContainer = document.createElement('div');
	const carPicture = document.createElement('img');

	const trackLength = 100000;
	const velocity = car.max_velocity / 3.6
	const t1 = velocity / car.acceleration;
	const s1 = (Math.pow(t1, 2) * (car.acceleration / 2));
	const s2 = trackLength - s1;
	const t2 = s2 / velocity;
	const fuel = (car.fuel_rest * 100) / car.fuel_consumption;
	const timeRace = (t1 + t2) / 180;
	
	carContainer.className = 'car__container';
	carPicture.className = 'car__picture';
	
	const translateX = (fuel <= (trackLength / 1000))
		? (fuel * trackWidth) / 100
		: trackWidth + 240;

	const resultTime = (fuel <= (trackLength / 1000))
		? 0
		: parseFloat(timeRace.toFixed(3));

	carContainer.style.cssText = `
		transform: translateX(${translateX}px);
		transition-duration: ${timeRace}s;
	`;

	stateApp = {
		...stateApp,
		cars: [
			...stateApp.cars,
			{name: car.image, timeRace: resultTime},
		]
	}

	carPicture.src = `${apiUrl}/${configImg.image_path}/${car.image}.${configImg.image_ext}`;
	carContainer.appendChild(carPicture);

	return carContainer;
};

const renderApp = async (container, loading) => {
	const {config, items} = await getCars();
	const assetsUrl = config.image_path;
	
	container.removeChild(loading);
	
	const btnStart = document.getElementById('btn-start');
	const start = document.createElement('div');
	const track = document.createElement('div');
	const finish = document.createElement('div');
	
	start.className = 'start _is-ready';
	track.className = 'track';
	finish.className = 'finish';
	container.appendChild(start);
	container.appendChild(track);
	container.appendChild(finish);

	items.forEach(car => start.appendChild(makeCar(car, config, track.offsetWidth)));

	btnStart.addEventListener('click', () => {
		const popup = document.getElementById('popup');
		const resultList = document.getElementById('result__list');

		start.classList.remove('_is-ready');

		const maxTimeRace = _.maxBy(stateApp.cars, I => I.timeRace).timeRace;

		stateApp = {
			...stateApp,
			timeRacing: maxTimeRace,

			cars: _.chain(stateApp.cars)
				.map(I => I.timeRace === 0 ? {...I, timeRace: 99999} : I)
				.sortBy('timeRace')
				.map((I, idx) => ({
					rank: idx + 1,
					...I,
					timeRace: I.timeRace === 99999 ? 'не доехал' : `${I.timeRace} сек.`,
				}))
				.value(),
		}

		setTimeout(() => {
			stateApp.cars.forEach(car => resultList.appendChild(makeResultItem(car.rank, car.name, car.timeRace)));
			popup.classList.add('_is-shown');
		}, stateApp.timeRacing * 1000)
	});
}

const makeResultItem = (rank, name, time) => {
	const resultItem = document.createElement('li');
	const captionRank = document.createElement('div');
	const captionName = document.createElement('div');
	const captionTime = document.createElement('div');

	resultItem.className = 'result__item';
	captionRank.className = 'caption caption__rank';
	captionName.className = 'caption caption__name';
	captionTime.className = 'caption caption__time';

	captionRank.textContent = rank;
	captionName.textContent = name;
	captionTime.textContent = time;

	resultItem.appendChild(captionRank);
	resultItem.appendChild(captionName);
	resultItem.appendChild(captionTime);
	
	return resultItem;
}

window.addEventListener('load', () => {
	const container = document.getElementById('root');
	const loading = document.createElement('div');
	const btnReload = document.getElementById('btn-reload');

	btnReload.addEventListener('click', () => window.location.reload());

	loading.className = 'loading';
	loading.innerText = 'Загрузка...';

	container.appendChild(loading);

	renderApp(container, loading);
})
