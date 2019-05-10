require('@babel/polyfill');

const questionsError = document.querySelector('.main-page__testing > .message-error');
const questionsList = document.querySelector('.main-page__testing > .content > .list');
const questionsBtnLink = document.querySelector('.main-page__testing > .btn-link');

const addAnswersItem = (text, answerId, questionId) => {
	const answerItem = document.createElement('li');
	const answerRadio = document.createElement('input');
	const answerText = document.createElement('label');

	answerItem.className = "item";

	answerRadio.type = "radio";
	answerRadio.id = answerId;
	answerRadio.value = answerId;
	answerRadio.name = questionId
	answerText.htmlFor = answerId
	answerText.innerText = `${text}`;

	answerItem.appendChild(answerRadio);
	answerItem.appendChild(answerText);

	return answerItem;
}

const addQuestionsItem = (count, picture, text, answers, id) => {
	const questionItem = document.createElement('li');
	const questionTitle = document.createElement('h2');
	const questionContent = document.createElement('div');
	const questionText = document.createElement('p');
	const answersList = document.createElement('ul');
	
	if(picture) {
		const questionWrapPicture = document.createElement('div');
		const questionPicture = document.createElement('img');

		questionWrapPicture.className = "image"
		questionPicture.className = "picture"

		questionPicture.src = picture;
		questionPicture.width = 200;

		questionWrapPicture.appendChild(questionPicture);
		questionContent.appendChild(questionWrapPicture);
	}

	questionItem.className = "item";
	questionTitle.className = "title"
	questionContent.className = "content"
	questionText.className = "text"
	answersList.className = "answers__list"
	
	questionItem.dataset.questionId = id;
	questionTitle.innerText = `Вопрос ${count}`;
	questionText.innerText = `${text}`;

	questionContent.appendChild(questionText);

	answers.map(I => answersList.appendChild(
		addAnswersItem(I.text, I._id, id)
	));

	questionItem.appendChild(questionTitle);
	questionItem.appendChild(questionContent);
	questionItem.appendChild(answersList);

	return questionItem;
}

if(questionsList) {
	data.questions.map((I, idx) => questionsList.appendChild(
		addQuestionsItem(idx + 1, I.questions_picture, I.questions_text, I.answers, I._id)
	));
}

if(questionsBtnLink)
	questionsBtnLink.addEventListener('click', event => {
		event.preventDefault();

		const userAnswers = Array
			.from(questionsList.children)
			.map(I => {
				const checkedAnswerItem = Array
					.from(I.lastElementChild.children)
					.reduce((result, item) => (item.firstElementChild.type == 'radio' && item.firstElementChild.checked
						? result = item
						: result),

						null
					);

				return {
					question: I.dataset.questionId,

					answer: checkedAnswerItem ? checkedAnswerItem.firstElementChild.id : null
				}
			});

		const isNotAllFilled = userAnswers.some(I => !I.answer);

		if(isNotAllFilled)
			return questionsError.textContent = " — Необходимо ответить на все вопросы";
			

		localStorage.setItem('user_answers', JSON.stringify(userAnswers))
		window.location.href = '/frontend-sandbox/testing-vanila-js/build/complete.html';
	});

	console.log(window.location);
	console.log(window.location.pathname.split("/").slice(-1));
	
if(window.location.pathname.split("/").slice(-1)[0] === 'complete.html') {
	const resultUserAnswers = JSON.parse(localStorage.getItem('user_answers')) || [];

	const countRightAnswers = resultUserAnswers.reduce((result, item) => {
		if (data.answers.some(I => I.question === item.question && I.answer === item.answer))
			result++
		
		return result
	}, 0)

	const resultContent = document.querySelector('.main-page__complete > .section > .content');

	const resultTitle = document.createElement('h2');
	const resultInfo = document.createElement('p');

	if(countRightAnswers >= 0 && countRightAnswers < 6) {
		resultTitle.innerText = "Не прошел";
		resultTitle.className = "result-title _is-failure";
	}

	if(countRightAnswers >= 6 && countRightAnswers < 10) {
		resultTitle.innerText = "Прошел";
		resultTitle.className = "result-title _is-success";
	}

	if(countRightAnswers >= 10) {
		resultTitle.innerText = "Прошел с отличием";
		resultTitle.className = "result-title _is-success";
	}

	resultInfo.innerText = `${countRightAnswers} из ${data.answers.length}`;
	resultInfo.className = "result-info";

	resultContent.insertBefore(resultInfo, resultContent.firstElementChild);
	resultContent.insertBefore(resultTitle, resultContent.firstElementChild);

	console.log(countRightAnswers);

}

