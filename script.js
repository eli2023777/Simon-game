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


// Function (A) אתחול ואיפוס
// This function does NOT start the game, you need to press a button to start the game
function initGame() {
    highestLevel.innerHTML = `Highest level: ${localStorage.getItem('highestLevel')}`;
    userInputArr = []; // User input array
    userCounter = 0; // User counter 
    arrRound = []; // Array round
    startBtn.value = 'Start';
    console.log('Game initiated...');
}


// Function (B) ניהול שלב/סיבוב
function round() {
    output.innerHTML = 'Good luck!';

    // 1. Create step and add as a last elemnt to the array
    // arrRound[gameCounter];
    userInputArr = [];
    gameTurn = true;

    // :מהסיבוב השני ומעלה
    // בתור של המחשב - עובר על כל הלחיצות הקודמות לפני הלחיצה החדשה

    for (let i = 1; i <= arrRound.length; i++) {
        setTimeout(() => {
            if (gameTurn == true) mySwitch(arrRound[i - 1]);
        }, i * 1000);

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
    document.querySelectorAll('.colorBtn').forEach(button => button.style.cursor = 'progress');

    switch (num) {
        case 1:
            green.click();
            green.style.borderColor = '#fff';
            green.style.borderWidth = '5px';
            new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3").play();

            setTimeout(() => { green.style.borderColor = '#000'; }, 500);

            console.log('green game clicked');
            break;

        case 2:
            red.click();
            red.style.borderColor = '#fff';
            red.style.borderWidth = '5px';
            new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3").play();
            setTimeout(() => { red.style.borderColor = '#000'; }, 500);

            console.log('red game clicked');

            break;

        case 3:
            blue.click();
            blue.style.borderColor = '#fff';
            blue.style.borderWidth = '5px';
            new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3").play();

            setTimeout(() => { blue.style.borderColor = '#000' }, 500);


            console.log('blue game clicked');

            break;

        case 4:
            yellow.click();
            yellow.style.borderColor = '#fff';
            yellow.style.borderWidth = '5px';
            new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3").play();

            setTimeout(() => { yellow.style.borderColor = '#000' }, 500);


            console.log('yellow game clicked');

            break;
    }
}



// Function (D)
function userTurn(arrRound) {
    // Get input from the user
    // const userInput = prompt('Please enter your guess');
    let a = 0;
    document.querySelectorAll('.colorBtn').forEach(button => button.style.cursor = 'pointer');

    // Create a function to handle button clicks
    function handleButtonClick(event) {

        const clickedBtn = event.target;
        console.log(clickedBtn.id);
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
        }
        a++;
        // Remove the event listener after a button is clicked
        if (a === arrRound.length) {
            document.querySelectorAll('.colorBtn').forEach(button => {
                button.removeEventListener('click', handleButtonClick);
            });
            console.log('remove');
            endTurn(userInputArr, arrRound);

        }
    }


    document.querySelectorAll('.colorBtn').forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });

}


function endTurn(userInputArr, arrRound) {
    // Continue with the game logic (compare input with the array, etc.)
    if (arraysAreEqual(userInputArr, arrRound)) {
        startBtn.value = 'Success!';

        setTimeout(() => {
            startBtn.value = 'Start';
            userCounter++;
            level.innerHTML = `Level: ${userCounter}`;
            round();
        }, 1000);


    } else {
        output.innerHTML = `Game over! Your score: ${userCounter}.`;
        startBtn.value = 'Try again';
        if (userCounter > localStorage.getItem('highestLevel')) {
            localStorage.setItem('highestLevel', userCounter);
        }
        new Audio("game-over-sound-effect.wav").play();
        initGame();
    }
}

function arraysAreEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}



initGame();
document.getElementById('btnLoad').addEventListener('click', round);

















