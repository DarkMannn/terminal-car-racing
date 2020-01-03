import * as ansiEscapes from 'ansi-escapes';

const In = process.stdin;
const Out = process.stdout;
let shouldDrawLineOneFirst = true;
let carPosition = { x: 1, y: 10 };
let latestChunk: string;
const CAR = '0';

In.setRawMode(true);
In.setEncoding('utf-8');
In.on('readable', () => {

    let chunk;
    while(chunk = In.read()) {
        latestChunk = chunk;

        if (chunk === '\r') {
            process.exit(0);
        }
        else if (chunk == 'd') {
            carPosition.x = carPosition.x >= 9 ? 9 : carPosition.x + 1;
        }
        else if (chunk === 'a') {
            carPosition.x = carPosition.x <= 1 ? 1 : carPosition.x - 1;
        }
        else if (chunk === 's') {
            carPosition.y = carPosition.y >= 19 ? 19 : carPosition.y + 1;
        }
        else if (chunk === 'w') {
            carPosition.y = carPosition.y <= 1 ? 1 : carPosition.y - 1;
        }
    }
});

const writeLineOne = (x: number, y: number): void => {

    Out.write(ansiEscapes.cursorTo(x, y));
    Out.write('|');
    Out.write(ansiEscapes.cursorTo(x + 10, y));
    Out.write('|');
};
const writeLineTwo = (x: number, y: number): void => {

    Out.write(ansiEscapes.cursorTo(x, y));
    Out.write('.');
    Out.write(ansiEscapes.cursorTo(x + 5, y));
    Out.write('|');
    Out.write(ansiEscapes.cursorTo(x + 10, y));
    Out.write('.');
};
const drawTheScreen = () => {

    Out.write(ansiEscapes.clearScreen);
    [...Array(10).keys()].map((item) => item * 2).forEach((item, index) => {

        if (shouldDrawLineOneFirst) {
            writeLineOne(10, item);
            writeLineTwo(10, item + 1);
        }
        else {
            writeLineTwo(10, item);
            writeLineOne(10, item + 1);
        }

        if (index === 5) {
            Out.write(ansiEscapes.cursorTo(10 + carPosition.x, carPosition.y));
            Out.write(CAR);
        }
    });
    shouldDrawLineOneFirst = !shouldDrawLineOneFirst;
    Out.write(ansiEscapes.cursorTo(20, 100));
    Out.write(ansiEscapes.eraseLine);
    Out.write(latestChunk || '');
    Out.write(ansiEscapes.cursorNextLine);
};

setInterval(drawTheScreen, 200);

export {};
