const readline = require("readline");
const rl = readline.createInterface(
    process.stdin,
    process.stdout);

const fs = require("fs");

let gameState = {
    counter: 0,
    minValue: 0,
    maxValue: 100,
    randomNumber: Math.floor(Math.random() * 100),
}

async function writeFile (text) {
    await fs.promises.appendFile("./log", text, {
         encoding: "utf-8"
    });
}

async function getUserInput() {
    let promise = new Promise(function(resolve, reject) {
        let result = null;

        rl.question('Введите число от 1 до 100 или exit: ', (input) => {
            let result = input;
            return resolve(result);
        });
    });
    return await promise;    
} 

async function play() {
    while (true) {
        let userInput = await getUserInput();
        if (userInput.toLowerCase() === "exit") {
            break;
        }
        
        let number = parseInt(userInput);

        if (isNaN(number) || number < gameState.minValue || number > gameState.maxValue) {
            let text = `Ошибка, число  ${number} не в указанном интервале.\n `;
            writeFile(text);
            console.log(text);
            continue;
        }

        gameState.counter++;

        if (number === gameState.randomNumber) {
            let text = `Вы угадали! за ${gameState.counter} попыток. Ваше число ${gameState.randomNumber}\n`;
            writeFile(text);
            console.log(text);
            break;
        }
        
        if (number > gameState.randomNumber) {
            let text = `Попытка ${gameState.counter} Ваше число больше загаданного\n`;
            writeFile(text);
            console.log(text);
        }
        else {
            let text = `Попытка ${gameState.counter} Ваше число меньше загаданного\n`;
            writeFile(text);
            console.log(text);
        }
    }
    rl.close();
}

play();

