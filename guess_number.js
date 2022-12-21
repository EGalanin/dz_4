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

function log(pathToFile) {
    if (pathToFile) {
        fs.writeFileSync(pathToFile, "");
    }

    return function add(line) {
        if (pathToFile) {
            fs.appendFile(pathToFile, line, "utf-8", (err) => {
                if(err) {
                    console.log("Ошибка");
                }
            });
        }
        console.log(line);
    }
}


function play(response) {
    rl.question('Введите число от 1 до 100 или exit: ', (input) => {
        if (input.toLowerCase() === "exit") {
            rl.close();
            return;
        }

        let number = +input;

        if (isNaN(number) || number < gameState.minValue || number > gameState.maxValue) {
            response("Ошибка, число не в указанном интервале.\n ");
            play(response);
        }

        gameState.counter++;

        if (number === gameState.randomNumber) {
            response(`Вы угадали! за ${gameState.counter} попыток`);
            rl.close();
            return;
        }
        
        if (number > gameState.randomNumber) {
            response(`Попытка ${gameState.counter} Ваше число больше загаданного\n`);
        }
        else {
            response(`Попытка ${gameState.counter} Ваше число меньше загаданного\n`);
        }

        play(response);
    });
}

let response = log("./log");
play(response);

