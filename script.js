const level = document.getElementById('level');
const highestLevel = document.getElementById('highestLevel');

let arrRound = []; // Array round
let gameCounter; // Game counter

// Colors
const green = document.getElementById('green');
const red = document.getElementById('red');
const blue = document.getElementById('blue');
const yellow = document.getElementById('yellow');

let userInputArr = [];
let gameTurn;

const startBtn = document.getElementById('btnLoad');
const output = document.getElementById('output');

const colorBtn = document.querySelectorAll('.colorBtn');

let currentHighestLevel;

// Function (A-1) אתחול ואיפוס
// This function does NOT start the game, you need to press a button to start the game
function initGame() {
    level.innerHTML = `Level: 0`;
    currentHighestLevel = localStorage.getItem('highestLevel') ? localStorage.getItem('highestLevel') : 0
    highestLevel.innerHTML = `Highest level: ${currentHighestLevel}`;

    userInputArr = []; // User input array
    userCounter = 0; // User counter 
    arrRound = []; // Array round

    startBtn.value = 'Start';
}

// Function (A-2) - תחילת משחק
function start() {
    output.innerHTML = 'Good Luck!';
    startBtn.disabled = true;
    startBtn.style.cursor = 'auto';
    startBtn.value = '';
    setTimeout(() => {
        output.innerHTML = '';
    }, 2000);
    round();
}

// Function (B) ניהול שלב/סיבוב
function round() {

    userInputArr = [];
    gameTurn = true;


    // :מהסיבוב השני ומעלה
    // בתור של המחשב - עובר על כל הלחיצות הקודמות לפני הלחיצה החדשה

    for (let i = 0; i <= arrRound.length; i++) {
        setTimeout(() => {
            if (gameTurn == true) mySwitch(arrRound[i]);
        }, (i + 1) * 1000);

    }

    // הלחיצה החדשה של המחשב
    setTimeout(() => {
        let newStep = createStep(); // function (C) --> Random num
        arrRound.push(newStep);

        gameTurn = false;
        // עובר לתור המשתמש
        userTurn(arrRound); // Function (D) 
    }, 1000 + (arrRound.length * 1000));

}


// Function (C)
// 1. Creats a random number from 1 to 4
// 2. Returns the result and/or the color 
function createStep() {
    let random = Math.round(Math.floor((Math.random() * 4) + 1));
    mySwitch(random);
    return random;
}

function mySwitch(num) {
    colorBtn.forEach(button => button.style.cursor = 'wait');

    switch (num) {
        case 1:
            green.click();
            green.style.borderColor = '#fff';
            green.style.borderWidth = '5px';
            new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3").play();

            setTimeout(() => { green.style.borderColor = '#000'; }, 500);
            break;

        case 2:
            red.click();
            red.style.borderColor = '#fff';
            red.style.borderWidth = '5px';
            new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3").play();
            setTimeout(() => { red.style.borderColor = '#000'; }, 500);
            break;

        case 3:
            blue.click();
            blue.style.borderColor = '#fff';
            blue.style.borderWidth = '5px';
            new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3").play();

            setTimeout(() => { blue.style.borderColor = '#000' }, 500);
            break;

        case 4:
            yellow.click();
            yellow.style.borderColor = '#fff';
            yellow.style.borderWidth = '5px';
            new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3").play();

            setTimeout(() => { yellow.style.borderColor = '#000' }, 500);

            break;
    }
}



// Function (D)
function userTurn(arrRound) {

    let a = 0;
    colorBtn.forEach(button => button.style.cursor = 'pointer');

    // Create a function to handle button clicks
    function handleButtonClick(event) {

        const clickedBtn = event.target;
        if (gameTurn == false) {

            switch (clickedBtn.id) {
                case 'green':
                    userInputArr.push(1);
                    green.style.borderColor = '#fff';
                    green.style.borderWidth = '5px';
                    new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3").play();

                    setTimeout(() => { green.style.borderColor = '#000' }, 500);
                    break;

                case 'red':
                    userInputArr.push(2);
                    red.style.borderColor = '#fff';
                    red.style.borderWidth = '5px';
                    new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3").play();

                    setTimeout(() => { red.style.borderColor = '#000' }, 500);

                    break;

                case 'blue':
                    userInputArr.push(3);
                    blue.style.borderColor = '#fff';
                    blue.style.borderWidth = '5px';
                    new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3").play();

                    setTimeout(() => { blue.style.borderColor = '#000' }, 500);
                    break;

                case 'yellow':
                    userInputArr.push(4);
                    yellow.style.borderColor = '#fff';
                    yellow.style.borderWidth = '5px';
                    new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3").play();

                    setTimeout(() => { yellow.style.borderColor = '#000' }, 500);
                    break;
            }

            // Check in every user clicked (by userInputArr[a]) if it is match to arrRound[a]
            if (!(arraysAreEqual(userInputArr[a], arrRound[a]))) {
                colorBtn.forEach(button => {
                    button.removeEventListener('click', handleButtonClick);
                });
                gameOver();
            } else {
                a++;
            }
        }

        // Remove the event listener after a successful turn and end the turn

        if (a === arrRound.length) {
            colorBtn.forEach(button => {
                button.removeEventListener('click', handleButtonClick);
            });
            endTurn(userInputArr, arrRound);
        }
    }


    colorBtn.forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });

}


function endTurn(userInputArr, arrRound) {
    // Continue with the game logic (compare input with the array, etc.)
    if (arraysAreEqual(userInputArr, arrRound)) {
        userCounter++;
        successMessages();

        setTimeout(() => {
            level.innerHTML = `Level: ${userCounter}`;
            round();
        }, 1000);

        setTimeout(() => {
            startBtn.value = '';
        }, 2500);
    }
}

function arraysAreEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
};


function successMessages() {

    switch (userCounter) {
        case 1:
            seccessMsg = 'Success!';
            break;

        case 2:
            seccessMsg = 'Nice!'
            break;

        case 3:
            seccessMsg = 'Good!'
            break;

        case 4:
            seccessMsg = 'Very Good!'
            break;

        case 5:
            seccessMsg = 'Great!'
            break;

        case 6:
            seccessMsg = 'Awesome!'
            break;

        case 7:
            seccessMsg = 'Excellent!'
            break;

        case 8:
            seccessMsg = 'Fantastic!!'
            break;

        case 9:
            seccessMsg = 'Amazing!!'
            break;

        case 10:
            seccessMsg = 'Wow!!!'
            break;
    }

    startBtn.value = seccessMsg;

}


function gameOver() {
    output.innerHTML = `Game Over! Your score: ${userCounter}.`;
    startBtn.value = 'Try again';
    startBtn.disabled = false;
    startBtn.style.cursor = 'pointer';


    if (userCounter > localStorage.getItem('highestLevel')) {
        localStorage.setItem('highestLevel', userCounter);
    }
    new Audio("game-over-sound-effect.wav").play();
    initGame();

}




initGame();
document.getElementById('btnLoad').addEventListener('click', start);




