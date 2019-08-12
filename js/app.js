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
let counter = 0;
const urlQuestion = "json/question.json";
const urlAnswer = "json/answer.json";
let arrayQuestions;
let arrAnswer;
fetch(urlQuestion)
	.then(response => {
		return response.json();
	})
	.then(data => {
		arrayQuestions = data;
	})
	.catch(err => {
		console.log("Unable to fetch for questions");
	});
fetch(urlAnswer)
	.then(response => {
		return response.json();
	})
	.then(data => {
		arrAnswer = data;
	})
	.catch(err => {
		console.log("Unable to fetch answers");
	});

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
/*
 * the below function saves initial counter of value 0 to the database
 * and then return a resolved promise due to the asynchronous nature of the database;
 */

const uiDisplay = () => {
	if (counter < 5 && counter >= 0) {
		let arrayCounter = 0;
		const index = arrayNum[counter];
		const question = arrayQuestions[index].question;
		const answers = arrayQuestions[index].answers;
		const questionFieldElement = document.getElementById('question');
		const answersFieldELement = document.querySelectorAll(".input");
		questionFieldElement.textContent = question;
		answersFieldELement.forEach(element => {
			element.textContent = answers[arrayCounter];
			arrayCounter++;
		});
	}

}




window.addEventListener("load", () => {
	uiDisplay();
});

/**
 * this holds the element button with value next and calls uiDisplay
 *  whenever the nextButton is clicked with the counter increasing
 */
const nextButton = document.querySelector('#next');
nextButton.addEventListener("click", () => {
	counter++;
	uiDisplay();
});

/**
 * this holds the element button with value previous and calls uiDisplay
 *  whenever the previousButton is clicked with the counter decreasing
 */

const previousButton = document.querySelector('#previous');
previousButton.addEventListener("click", () => {
	counter--;
	uiDisplay();
})

console.log(arrayNum);