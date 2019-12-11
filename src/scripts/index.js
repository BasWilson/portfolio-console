import '../styles/index.scss';
import '../styles/console.scss';

import { ConsolePortfolio } from './console.js';

window.con = new ConsolePortfolio();

function intro() {
    let lines = [
        `Hello and welcome to my ✨ awesome ✨ portfolio console window!`,
        'I thought it would be cool to show you around in the natural habitat of a developer.\n',
        'Press any key to continue...'
    ];
    window.con.writeLine(lines[0], () => {
        window.con.writeLine(lines[1], () => {
            window.con.writeLine(lines[2], () => {

            });
        });
    });
}

intro();