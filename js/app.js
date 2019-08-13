/**
 *
 * Developer : Ogunwale Pelumi Caleb
 *
 * Details :
 *
 *	*Twitter : https://twitter.com/calebdeji06
 *	*Github : https://github.com/calebdeji
 *	*Dev.to : https://dev.to/calebdeji
 *  *website : https://calebdeji.github.io
 *
 **/
/*************************************** */

/*
 *
 * To receive the set of questions and respective anwsers from the json file on the server;
 * xmlhttp for the request of questions on the server
 *xmlhttp for the request of answers on the server;
 *
 */
"use strict";
let counter = 0;
const urlQuestion = "/json/question.json";
const urlAnswer = "json/answer.json";
let arrayQuestions;
let arrAnswer;
/**
 * function to return a promise of the fetched questions
 */
const fetchApi = () => {
	const response = fetch('json/question.json');
	return new Promise((resolve, reject) => {
		resolve(response.then((data) => data.json()));
		reject((err) => console.log("unable to fetch question api"))
	});
}
/**
 * to update the arrayQuestions variable
 */
const getApi = async () => {
	arrayQuestions = await fetchApi();
}
/**
 * function to return a promise of the fetched answers
 */
const fetchAnswerApi = () => {
	const response = fetch('json/answer.json');
	return new Promise((resolve, reject) => {
		resolve(response.then((data) => data.json()));
		reject((err) => console.log("unable to fetch answer api"));
	})
}
/**
 * to update the arrAnswer variable
 */
const getAnswerApi = async () => {
	arrAnswer = await fetchAnswerApi();
}
/*==========*********************************************************================ */
let arrContent = []; //this holds the answer picked by the user
/**
 * To generate any five random numbers to allocate to the index of the question arrays to be displayed
 *
 */
let arrayNum = []; // this arrays holds the five random numbers generated;
const genNum = Math.floor(Math.random() * 10);
arrayNum.push(genNum);
for (let counter = 0; counter < 4; counter++) {
	//the counter is less than five because we already initialise arrayNum[0] with genNum
	let newGen = Math.floor(Math.random() * 10);
	while (arrayNum.lastIndexOf(newGen) !== -1) {
		newGen = Math.floor(Math.random() * 10);
	}
	arrayNum.push(newGen);
}

/*============================ generation done!===============================*/

/* *************************************************************** */

/**
 * the below function changes the data on the ui
 */
const uiDisplay = () => {
	if (counter < 5 && counter >= 0) {
		let arrayCounter = 0;
		const index = arrayNum[counter];
		const question = arrayQuestions[index].question;
		const answers = arrayQuestions[index].answers;
		const questionFieldElement = document.getElementById("question");
		const answersFieldELement = document.querySelectorAll(".input");
		questionFieldElement.textContent = question;
		answersFieldELement.forEach(element => {
			element.textContent = answers[arrayCounter];
			arrayCounter++;
		});
	} else {
		submitAll();
	}
};

/**
 * this holds the element button with value next and calls uiDisplay
 *  whenever the nextButton is clicked with the counter increasing
 *  and saves the answer chosen to an array
 */
const nextButton = document.querySelector("#next");
nextButton.addEventListener("click", () => {
	if (counter < 5) {
		const radioElements = document.querySelectorAll("input[type= radio]");
		//to push the answer chosen to the arrContent array
		/**
		 * the below variable to hold an increment if any answer was chosen
		 * it is initialized to deal with unanswered question
		 */
		let holderAnswer = 0;
		radioElements.forEach(element => {
			if (element.checked == true) {
				arrContent.push({
					counterString: counter,
					answer: element.id
				});
				holderAnswer++;
			}
		});
		/**
		 * to handle unanswered questions
		 */
		if (holderAnswer == 0) {
			arrContent.push({
				counterString: counter,
				answer: "unanswered"
			});
		}
		counter++;
		uiDisplay();
		if (counter == 4) {
			nextButton.value = "Submit";
		}
	}

	/**
	 * to cancel all checked properties
	 */
	const radioElements = document.querySelectorAll("input[type= radio]");
	radioElements.forEach(element => {
		element.checked = false;
	});
});

/**
 * this holds the element button with value previous and calls uiDisplay
 *  whenever the previousButton is clicked with the counter decreasing
 *  and removes the last saved answer
 */

const previousButton = document.querySelector("#previous");
previousButton.addEventListener("click", () => {
	/**
	 * to make the answer chosen before reflect on the ui
	 */
	if (counter > 0) {
		const arrContentLenght = arrContent.length;
		const previousAnswer = arrContent[arrContentLenght - 1].answer;
		const radioElements = document.querySelectorAll("input[type= radio]");
		radioElements.forEach(element => {
			if (element.id == previousAnswer) {
				element.checked = true;
			}
		});
		arrContent.pop(); // to remove the last answer chosen from the array
		counter--; //go back to the previous question
	} else {
		counter = counter;
	}
	uiDisplay();
	if (counter !== 4) {
		const nextButton = document.querySelector("#next");
		nextButton.value = "Next";
	}
});

const submitAll = () => {
	/**
	 * this holds the corresponding answers to random questions generated
	 */
	let answer = [];
	/**
	 * the holds the answers chosen by the user
	 */
	let answersChosen = [];
	for (let i = 0; i < 5; i++) {
		answer.push(arrAnswer[arrayNum[i]].answer);
		answersChosen.push(arrContent[i].answer);
	}

	/**
	 * to compare the two arrays
	 */
	let score = 0; //this holds the score of the user
	/**
	 * double loop
	 */
	for (
		let answerELement = 0; answerELement < answersChosen.length; answerELement++
	) {
		for (
			let answersChosenElement = 0; answersChosenElement < answersChosen.length; answersChosenElement++
		) {
			if (answerELement == answersChosenElement) {
				if (answer[answerELement] == answersChosen[answersChosenElement]) {
					score++;
				}
			}
		}
	}
	const overLay = document.querySelector(".over-lay");
	const scoreField = document.querySelector("#score");
	scoreField.textContent = `Your Score is ${score} / ${arrayNum.length}`;
	overLay.style.display = "flex";
};

/**
 * what happens to replay button
 */
const replayButton = document.querySelector("#replay");
replayButton.addEventListener("click", () => {
	location.reload();
});
/**
 * what happens to close button
 */
const closeButton = document.querySelector("#close");
closeButton.addEventListener("click", () => {
	if (window.confirm("Do you really want to stop playing?")) {
		window.close();
	} else {
		window.reload();
	}
});

window.addEventListener("load", async () => {
	setTimeout(() => {
		let loader = document.getElementsByClassName("loader-body")[0];
		loader.style.display = "none";
		document.getElementById("main").style.display = "flex";
	}, 3000);
	await getApi();
	await getAnswerApi();
	uiDisplay();
});