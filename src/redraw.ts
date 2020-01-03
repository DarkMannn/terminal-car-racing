import * as ansiEscapes from 'ansi-escapes';
// const In = process.stdin;
const Out = process.stdout;

let shouldDrawLineOneFirst = true;
// const waitc = (ms: number = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

process.stdin.setRawMode(true);
process.stdin.setEncoding('utf-8');

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
    [...Array(10).keys()].map((item) => item * 2).forEach((i) => {

        if (shouldDrawLineOneFirst) {
            writeLineOne(10, i);
            writeLineTwo(10, i + 1);
        }
        else {
            writeLineTwo(10, i);
            writeLineOne(10, i + 1);
        }
    });
    shouldDrawLineOneFirst = !shouldDrawLineOneFirst;
    Out.write(ansiEscapes.cursorNextLine);
};

setInterval(drawTheScreen, 200);

export {};
