require('@babel/polyfill');

const questionsList = document.querySelector('.main-page__testing > .content > .list');

const addAnswersItem = (text, answerId, questionId) => {
	const answerItem = document.createElement('li');
	const answerRadio = document.createElement('input');
	const answerText = document.createElement('label');

	answerItem.className = "item";

	answerRadio.type = "radio";
	answerRadio.id = answerId;
	answerRadio.name = questionId
	answerText.htmlFor = answerId
	answerText.innerText = `${text}`;

	answerItem.appendChild(answerRadio);
	answerItem.appendChild(answerText);

	return answerItem;
}

const addQuestionsItem = (count, text, answers, id) => {
	const questionItem = document.createElement('li');
	const questionTitle = document.createElement('h2');
	const questionContent = document.createElement('div');
	const questionText = document.createElement('p');
	const answersList = document.createElement('ul');

	questionItem.className = "item";
	questionTitle.className = "title"
	questionContent.className = "content"
	questionText.className = "text"
	answersList.className = "answers__list"
	
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
		addQuestionsItem(idx + 1, I.questions_text, I.answers, I._id)
	));
}

