require('@babel/polyfill');

const getCars = async () => {
	return new Promise((resolve, reject) => {
		setTimeout(async() => {
			data = await fetch('http://we.pena-app.ru/rcrtng/api/cars/', {
				method: 'GET',
				mode: 'cors'
			}).then(res => res.json());
	
			// console.log(data);
			resolve(data);
		}, 2000);
	});
};

const makeCar = (car, configImg) => {
	const carContainer = document.createElement('div');
	const carPicture = document.createElement('img');

	carContainer.className = 'car__container';
	carPicture.className = 'car__picture';

	carPicture.src = `${configImg.image_path}/${car.image}.${configImg.image_ext}`;

	carContainer.appendChild(carPicture);

	return carContainer;
};

const renderApp = async (container, loading) => {
	const {config, items} = await getCars();

	const assetsUrl = config.image_path

	console.log(items);
	console.log(config);
	console.log(container);

	items.forEach(car => container.appendChild(makeCar(car, config)));
}

window.addEventListener('load', () => {
	const container = document.getElementById('root');
	const loading = document.createElement('h2');

	loading.innerText = 'Загрузка...'

	container.appendChild(loading);

	renderApp(container, loading);
})
