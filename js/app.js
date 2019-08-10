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
const getQuestion = id => {
  return new Promise((resolve, reject) => {
    let request = window.indexedDB.open("counter", 1);

    request.onsuccess = success => {
      resolve(request.result);
    };
    request.onerror = err => {
      //console.log("unable to open database");
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
/* ******************************======================******************************* */
/*
 * this is the first function called after successful loading of the web page
 * this function diplays individual question generated from the json file to the browser
 * it also returns a promise as a result of the asynchronous nature of the database
 */
async function setNextQuestion(id) {
  return new Promise(async (resolve, reject) => {
    // this is necessaary to avoid unanswered bug
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
          // //console.log("To display is ", arrayQuestions[correspondingObjIndex]);
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
                // //console.log(
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
              // //console.log(idAcquired + 1, "Updated successfully!");
            };
            requestNew.onerror = err => {
              // //console.log("Unable to update data ", err);
            };
          };
          resolve(saveAnswerChosenToDataBase());
          cursor.continue();
        } else {
          // //console.log("End of question");
          resolve(saveAnswerChosenToDataBase());
          document.getElementById("submit").value = "Submit";
          displayScore();
        }
      }
    };
  });
}
/* ************************************************************************** */
/*
* the below function saves the set of answers chosen by the user to the array arrContent
* the counterRadio was used because initially when the setNextQuestion was called, the below function 
  believes a question has been answered. So the counterRadio helps eradicate the problem.
*/
const saveAnswerChosenToDataBase = () => {
  let inputArrays = document.getElementsByName("choice-answer");
  let counterRadio = 0;
  for (let counter = 0; counter < inputArrays.length; counter++) {
    if (inputArrays[counter].checked === true) {
      arrContent.push(inputArrays[counter].id);
      counterRadio += 1;
    }

    // //console.log("arrContent[until ", counter, "] : ", arrContent);
  }
  if (counterRadio == 0) {
    let answersChosenLength = arrContent.length;
    if (answersChosenLength !== 0) {
      arrContent.push("unaswered");
    } else {
      arrContent[0] = "unanswered";
    }
  }
  //console.log("arrContent is : ", arrContent);
  return arrContent;
};
/* ********************************************************************* */
/*
 * The below function triggers the modal div to display the score
 * It closes the database and calls the function that deletes the database that holds the counter
 *
 */

const displayScore = () => {
  let score = 0;
  // let arrayNumScope = arrayNum;
  let arrayQuestionsPicked = [];
  let arrAnswersCompare = [];
  for (let counter = 0; counter < arrayNum.length; counter++) {
    arrayQuestionsPicked.push(arrayQuestions[arrayNum[counter]]);
    arrAnswersCompare.push(arrAnswer[arrayNum[counter]]);
  }
  for (let counter = 0; counter < arrayQuestionsPicked.length; counter++) {
    if (arrAnswersCompare[counter].answer == arrContent[counter]) {
      score += 1;
    }
  }
  document.getElementById("score").innerHTML =
    "Your score is : " + score + " / 5";
  /**to close the opened database */
  let request = window.indexedDB.open("counter", 1);
  request.onsuccess = () => {
    let db = request.result;
    db.close();
  };
  deleteDatabaseFunc(); // deletes the database counter
  //to display modal to the user
  let modalVar = document.getElementsByClassName("over-lay")[0];
  modalVar.style.display = "flex";
};
/* ******************************************************************* */
/**
 *  the below function deletes the counter database so that incase the page reloads,
 *  the counter will start afresh
 *
 */
const deleteDatabaseFunc = () => {
  let request = window.indexedDB.deleteDatabase("counter");
  request.onsuccess = () => {};
  request.onerror = err => {
    console.log("Couldn't delete database. Err : ", err);
  };
};
/* ****************************************************** */
/**
 * the below function works hand in hand with saveAnswerChosenToDataBase to eradicate the initial prob stated
 *
 */
const emptyArrContent = value => {
  value.shift();
};

document.getElementById("submit").addEventListener("click", () => {
  setNextQuestion(0);
});

/**
 * the below codes are only useful when the scores are displayed
 *
 */

document.getElementById("replay").addEventListener("click", () => {
  // window.location = "index.html";
  location.reload();
});
document.getElementById("close").addEventListener("click", () => {
  // document.close(); // coming back to input the code that closes the tab page;
  // window.location = "about:home"
});

/* *************************************************************** */

window.addEventListener("load", () => {
  setTimeout(() => {
    let loader = document.getElementsByClassName("loader-body")[0];
    loader.style.display = "none";
    document.getElementById("main").style.display = "flex";
  }, 10000);
  deleteDatabaseFunc(); // this deletes the database on load if not set.
  setNextQuestion(0).then(value => {
    emptyArrContent(value);
  });
});
