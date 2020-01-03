import * as ansiEscapes from 'ansi-escapes';

process.stdout.write(ansiEscapes.clearScreen + ansiEscapes.cursorUp(2) + ansiEscapes.cursorLeft + 'Darko');
process.stdout.write('Darko');
setInterval(() => {

    process.stdout.write('Darko' + ansiEscapes.cursorDown(1));
}, 2000);

process.stdin.setRawMode(true);
process.stdin.setEncoding('utf-8');
process.stdout.write(ansiEscapes.clearScreen);
process.stdin.on('readable', () => {

    let chunk;
    while(chunk = process.stdin.read()) {
        if (chunk === '\r') {
            process.exit(0);
        }

        process.stdout.write(chunk);
    }
});

export {};
