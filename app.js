window.addEventListener("resize", () => {
    let heightVar = window.innerHeight;
    let bodyVar = document.getElementsByTagName("body");
    bodyVar[0].style.height = heightVar;
});
window.addEventListener("load", () => {
    let heightVar = window.innerHeight;
    let bodyVar = document.getElementsByTagName("body");
    bodyVar[0].style.height = heightVar + "px";
    deleteDatabaseFunc();
    setNextQuestion(0);
});
let arrayQuestions = [{
        id: 1,
        question: "Which of the following items was owned by the fewest U.S homes in 1990?",
        answers: [
            "home Computer",
            "compact disk player",
            "cordless phone",
            "dishwater"
        ]
    },
    {
        id: 2,
        question: "In 1990, in what percentage of U.S married couples did the wife earn more money than the husband?",
        answers: ["8", "18", "38", "58"]
    },
    {
        id: 3,
        question: "The first black American pictured on a U.S postage stamp was who?",
        answers: [
            "Frederick Douglass",
            "Booker T. Washington",
            "Louis Armstrong",
            "Joe Louis"
        ]
    },
    {
        id: 4,
        question: "What did the 'D' in 'D-Day' stand for?",
        answers: ["doom", "day", "Dwight", "Dunkirk"]
    },
    {
        id: 5,
        question: "which of the following characters turned 40 years old in 1990?",
        answers: ["Charlie Brown", "Bugs Bunny", "Mickey Mouse", "Fred Flintstone"]
    },
    {
        id: 6,
        question: "The Philadelphia mint started putting a 'P' mint maek on quarters when ?",
        answers: ["1960", "1980", "never", "1958"]
    },
    {
        id: 7,
        question: "In J.Edgar Hoover, what did the J stand for?",
        answers: ["James", "John", "Joseph", "Jack"]
    },
    {
        id: 8,
        question: "When did the Liberty bell get its name?",
        answers: [
            "when it was made in 1701",
            "when it rang on July 4, 1776",
            "in the 19th century, whent it became a symbol of the abolition of slavery",
            "none"
        ]
    },
    {
        id: 9,
        question: "Cleromancy is divination involving what?",
        answers: ["Dice", "Glass", "Twigs", "Ink"]
    },
    {
        id: 10,
        question: "A person who's a fysigunkuus lacks what?",
        answers: ["Humor", "Wisdom", "Curiosity", "Temper"]
    }
];

let arrContent = []; //this holds the answer picked by the user
// to generate any 5 numbers;
let arrayNum = [];
for (let i = 0; i < 5; i++) {
    arrayNum[i] = Math.floor(Math.random() * 10);
    let counter = 0;
    for (let j = 0; j <= i; j++) {
        if (arrayNum[j] == arrayNum[i]) {
            counter += 1;
        }
        if (counter > 1) {
            for (let z = 0; z < i; z++) {
                let availableNo = Math.floor(Math.random() * 10);
                if (arrayNum.indexOf(availableNo) == -1) {
                    arrayNum[i] = availableNo;
                    // console.log("Available no is ", availableNo);
                    // console.log("arrayNum[", i, "] is", arrayNum[i]);
                }
            }
        }
    }
}
// console.log("ArrayNum is : ", arrayNum);
//to get the questions corresponding to the 5 random numbers
const getQuestion = id => {
    return new Promise((resolve, reject) => {
        let request = window.indexedDB.open("counter", 1);

        request.onsuccess = success => {
            resolve(request.result);
        };
        request.onerror = err => {
            console.log("unable to open database");
        };
        request.onupgradeneeded = event => {
            let db = event.target.result;
            let objectStore = db
                .createObjectStore("id-getQuestion", {
                    keyPath: "id"
                })
                .add({
                    id: "value",
                    idSaved: 0
                });
        };
    });
};
async function setNextQuestion(id) {
    let db = await getQuestion(id);
    let idAcquired = id;
    let correspondingObjIndex;
    let request = db
        .transaction(["id-getQuestion"], "readwrite")
        .objectStore("id-getQuestion");
    request.openCursor().onsuccess = event => {
        let cursor = event.target.result;
        if (cursor) {
            let id = cursor.value.idSaved;
            if (id < 5) {
                for (let arrayCount = 0; arrayCount < arrayNum.length; arrayCount++) {
                    if (arrayCount == id) {
                        correspondingObjIndex = arrayNum[id];
                    }
                }
                // console.log("To display is ", arrayQuestions[correspondingObjIndex]);
                let correspondingObjToDisplay = arrayQuestions[correspondingObjIndex];
                document.getElementById("question").innerHTML =
                    correspondingObjToDisplay.question;
                let inputValues = document.getElementsByClassName("input");
                // getQuestion(id + 1);
                for (let inputCounter = 0; inputCounter < 4; inputCounter++) {
                    for (objCounter = 0; objCounter < 4; objCounter++) {
                        if (inputCounter === objCounter) {
                            inputValues[objCounter].innerHTML =
                                correspondingObjToDisplay.answers[objCounter];
                            // console.log(
                            //    "array is : ",
                            //    correspondingObjToDisplay.answers[objCounter]
                            //);
                        }
                    }
                }
                request.get("value").onsuccess = event => {
                    let data = event.target.result;
                    data.idSaved += 1;
                    let requestNew = request.put(data);
                    requestNew.onsuccess = () => {
                        // console.log(idAcquired + 1, "Updated successfully!");
                    };
                    requestNew.onerror = err => {
                        // console.log("Unable to update data ", err);
                    };
                };
                saveAnswerChosenToDataBase();
                cursor.continue();
            } else {
                // console.log("End of question");
                saveAnswerChosenToDataBase();
                document.getElementById("submit").value = "Submit";
                displayScore();
            }
        }
    };
}
const saveAnswerChosenToDataBase = () => {
    let inputArrays = document.getElementsByName("choice-answer");
    for (let counter = 0; counter < inputArrays.length; counter++) {
        if (inputArrays[counter].checked === true) {
            arrContent.push(inputArrays[counter].id);
        }
    }
    // console.log("arrContent is : ", arrContent);
};
let arrAnswer = [{
        id: 1,
        answer: "second"
    },
    {
        id: 2,
        answer: "second"
    },
    {
        id: 3,
        answer: "fourth"
    },
    {
        id: 4,
        answer: "second"
    },
    {
        id: 5,
        answer: "first"
    },
    {
        id: 6,
        answer: "second"
    },
    {
        id: 7,
        answer: "second"
    },
    {
        id: 8,
        answer: "third"
    },
    {
        id: 9,
        answer: "first"
    },
    {
        id: 10,
        answer: "third"
    }
];
const displayScore = () => {
    let score = 0;
    // let arrayNumScope = arrayNum;
    let arrayQuestionsPicked = [];
    // let arrAnswersChosen = arrContent;
    let arrAnswersCompare = [];
    for (let counter = 0; counter < arrayNum.length; counter++) {
        arrayQuestionsPicked.push(arrayQuestions[arrayNum[counter]]);
        arrAnswersCompare.push(arrAnswer[arrayNum[counter]]);
    }
    console.log("array of questions picked : ", arrayQuestionsPicked);
    console.log("array of answers to compare : ", arrAnswersCompare);
    console.log("answer chosen : ", arrContent);
    for (let counter = 0; counter < arrayQuestionsPicked.length; counter++) {
        if (arrAnswersCompare[counter].answer == arrContent[counter]) {
            score += 1;
        }
    }

    console.log("Overall Score is : ", score);
    //to empty the idsved object Store
    let request = window.indexedDB.open("counter", 1);
    request.onsuccess = () => {
        let db = request.result;
        db.close();
        console.log("Hello, closed succesfully");
    };
    deleteDatabaseFunc(); // write the function
};
const deleteDatabaseFunc = () => {
    let request = window.indexedDB.deleteDatabase("counter");
    request.onsuccess = () => {
        console.log("database deleted");
    };
    request.onerror = err => {
        console.log("Couldn't delete database. Err : ", err);
    };

};
document.getElementById("submit").addEventListener("click", () => {
    setNextQuestion(0);
});