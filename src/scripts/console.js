export class ConsolePortfolio {
    constructor() {
        this.con = document.querySelector('.js-console');
        this.verticalIndicator = document.querySelector('.js-indicator-v');
        this.horizontalIndicator = document.querySelector('.js-indicator-h');
        this.lineHeight = 26;
        this.characterWidth = 11;

        this.currentLine = {
            x: 0,
            y: 0
        };

        this.lines = [];

        this.updateIndicator();
        window.addEventListener("resize", () => {
            this.updateIndicator();
        });
    }

    /**
     * Updates the location of the indicator according to currentLine
     */
    updateIndicator() {
        this.verticalIndicator.style.top = parseInt(this.lineHeight + (this.currentLine.y * this.lineHeight)) + "px";

        const line = document.querySelector(`#line-${this.lines.length - 1}`);
        if (line) {
            // Get the x and y postion of last span element in the line.
            const last = document.querySelector(`#line-${this.lines.length - 1}`).lastElementChild;
            const coords = {
                x: last.offsetLeft,
                y: last.offsetTop
            };
            if (coords.x == 35) return;
            this.horizontalIndicator.style.left = this.characterWidth + coords.x + "px";
            this.horizontalIndicator.style.top = coords.y + "px";
        }
    }

    /**
     * Will render a new line and then use the TypeWriter class to write out text
     * @param {String} string 
     */
    writeLine(string, finishedCallback = () => { }) {
        if (!string) return;
        this.renderLine();

        new TypeWriter(`#line-${this.lines.length - 1}`, string, {
            currentCharacterCallback: this.wroteChar,
            doneCallback: finishedCallback
        });
    }

    readLine() {

    }

    /**
     * Callback function for the TypeWriter
     * @param {Number} count 
     */
    wroteChar(count) {
        window.con.currentLine.x = count;
        window.con.updateIndicator();
    }

    /**
     * Appends an input or a paragraph to the next line
     * @param {Bool} input 
     */
    renderLine(input = false) {
        let line;

        if (!input) {
            const p = document.createElement('p');
            p.id = `line-${this.lines.length}`;
            p.classList.add('window__console-line');
            line = p;
        } else {

        }

        this.currentLine.y = this.lines.length;
        this.lines.push(line);
        this.con.appendChild(line);
    }
}

class TypeWriter {
    constructor(selector, string = [], options = {}) {
        if (!selector)
            return console.warn('You need to enter a valid selector');
        this.element = document.querySelector(selector);

        if (string.length == 0)
            return console.warn('Your string is empty');

        this.string = string;
        this.timeBetweenChar = options.hasOwnProperty('timeBetweenChar') ? options.timeBetweenChar : 80;
        this.timeBetweenWords = options.hasOwnProperty('timeBetweenWords') ? options.timeBetweenWords : 110;
        this.currentCharacterCallback = options.hasOwnProperty('currentCharacterCallback') ? options.currentCharacterCallback : () => { };
        this.doneCallback = options.hasOwnProperty('doneCallback') ? options.doneCallback : () => { };

        this.count = 0;

        this.nextChar();
    }

    nextChar() {
        if (this.count == this.string.length)
            return this.doneCallback();

        let timeout = this.timeBetweenChar;

        if (this.string[this.count] == " ")
            timeout = this.timeBetweenWords;

        setTimeout(() => {
            this.element.innerHTML += `<span>${this.string[this.count]}</span>`;
            this.count++;
            this.currentCharacterCallback(this.count);
            this.nextChar();
        }, timeout);
    }
}