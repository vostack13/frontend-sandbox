require('@babel/polyfill');

const getCars = async () => {
	setTimeout(async() => {
		const data = await fetch('http://we.pena-app.ru/rcrtng/api/cars/', {
			method: 'GET',
			mode: 'cors'
		}).then(res => res.json());

		console.log(data);
	}, 2000);
};

const makeCar = imageCar => {
	const carContainer = document.createElement('div');
	const carPicture = document.createElement('img');

	carContainer.className = 'car__container';
	carPicture.className = 'car__picture';
	
	carPicture.src = 'imageCar';

	carContainer.appendChild(carPicture);

	return carContainer;
};

const renderApp = async (container, loading) => {
	getCars();
	
	console.log(container);
	
	[1].forEach(I => container.appendChild(makeCar()));
}

window.addEventListener('load', () => {
	const container = document.getElementById('root');
	const loading = document.createElement('h2');

	loading.innerText = 'Загрузка...'

	container.appendChild(loading);

	renderApp(container, loading);
})
