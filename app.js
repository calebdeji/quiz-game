window.addEventListener("resize", () => {
    let heightVar = window.innerHeight;
    let bodyVar = document.getElementsByTagName("body");
    bodyVar[0].style.height = heightVar;
});
window.addEventListener("load", () => {
    let heightVar = window.innerHeight;
    let bodyVar = document.getElementsByTagName("body");
    bodyVar[0].style.height = heightVar + "px";
});
let arrayQuestions = [{
        id: 1,
        question: "Which of the following items was owned by the fewest U.S homes in 1990?",
        answers: () => {
            let answersVar = [
                "home Computer",
                "compact disk player",
                "cordless phone",
                "dishwater"
            ];
            return answersVar;
        }
    },
    {
        id: 2,
        question: "In 1990, in what percentage of U.S married couples did the wife earn more money than the husband?",
        answers: () => {
            let answersVar = ["8", "18", "38", "58"];
            return answersVar;
        }
    },
    {
        id: 3,
        question: "The first black American pictured on a U.S postage stamp was who?",
        answers: () => {
            let answersVar = [
                "Frederick Douglass",
                "Booker T. Washington",
                "Louis Armstrong",
                "Joe Louis"
            ];
            return answersVar;
        }
    },
    {
        id: 4,
        question: "What did the 'D' in 'D-Day' stand for?",
        answers: () => {
            let answersVar = ["doom", "day", "Dwight", "Dunkirk"];
            return answersVar;
        }
    },
    {
        id: 5,
        question: "which of the following characters turned 40 years old in 1990?",
        answers: () => {
            let answersVar = [
                "Charlie Brown",
                "Bugs Bunny",
                "Mickey Mouse",
                "Fred Flintstone"
            ];
            return answersVar;
        }
    },
    {
        id: 6,
        question: "The Philadelphia mint started putting a 'P' mint maek on quarters when ?",
        answers: () => {
            let answersVar = ["1960", "1980", "never", "1958"];
            return answersVar;
        }
    },
    {
        id: 7,
        question: "In J.Edgar Hoover, what did the J stand for?",
        answers: () => {
            let answersVar = ["James", "John", "Joseph", "Jack"];
            return answersVar;
        }
    },
    {
        id: 8,
        question: "When did the Liberty bell get its name?",
        answers: () => {
            let answersVar = [
                "when it was made in 1701",
                "when it rang on July 4, 1776",
                "in the 19th century, whent it became a symbol of the abolition of slavery",
                "none"
            ];
            return answersVar;
        }
    },
    {
        id: 9,
        question: "Cleromancy is divination involving what?",
        answers: () => {
            let answersVar = ["Dice", "Glass", "Twigs", "Ink"];
            return answersVar;
        },
        answer: "Dice"
    },
    {
        id: 10,
        question: "A person who's a fysigunkuus lacks what?",
        answers: () => {
            let answersVar = ["Humor", "Wisdom", "Curiosity", "Temper"];
            return answersVar;
        },
        answer: "Curiosity"
    }
];
// to generate any 5 numbers;
let arrayNum = [];
for (let i = 0; i < 5; i++) {
    arrayNum[i] = Math.ceil(Math.random() * 10);
    let counter = 0;
    for (let j = 0; j <= i; j++) {
        if (arrayNum[j] == arrayNum[i]) {
            counter += 1;
        }
        if (counter > 1) {
            for (let z = 0; z < i; z++) {
                let availableNo = Math.ceil(Math.random() * 10);
                if (arrayNum.indexOf(availableNo) == -1) {
                    //   console.log("arrayNum is ", arrayNum);
                    arrayNum[i] = availableNo;
                    console.log("Available no is ", availableNo);
                    console.log("arrayNum[", i, "] is", arrayNum[i]);
                }
            }
        }
    }
}

console.log(arrayNum);