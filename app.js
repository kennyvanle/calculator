let currentOperation = null;
let previousOperation = null;
let firstNumber = '';
let secondNumber = '';
let shouldResetScreen = false;

const screen = document.getElementById('screen');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');
const numberButtons = document.querySelectorAll('button.number');
const actionButtons = document.querySelectorAll('button.action');


numberButtons.forEach(btn => {
    btn.addEventListener('click', () => appendNumber(btn.textContent));
});

actionButtons.forEach(btn => {
    btn.addEventListener('click', () => setOperation(btn.textContent));
});

clearButton.addEventListener('click', clear);
equalsButton.addEventListener('click', calculate);

function appendNumber(number) {
    if (screen.textContent === '0' || shouldResetScreen) {
        shouldResetScreen = false;
        resetScreen();
    }
    screen.textContent += number;
}

function calculate() {
    if (currentOperation === null) {
        return;
    }
    if (currentOperation === '÷' && screen.textContent === '0') {
        alert('You cannot divide by 0!');
        clear();
        return;
    } else if (currentOperation === '√' && screen.textContent < '0') {
        alert('You cannot root a negative number!');
        clear();
        return;
    }
    secondNumber = screen.textContent;
    screen.textContent = roundResult(operate(currentOperation, firstNumber, secondNumber));
    currentOperation = null;
}

function setOperation(operator) {
    if (operator === '+/-') {
        screen.textContent = screen.textContent * -1;
    } else if (currentOperation !== null) {
        calculate();
    } else {
        firstNumber = screen.textContent;
        shouldResetScreen = true;
        if (operator !== '=') {
            currentOperation = operator;
        }
    }
}

function clear() {
    screen.textContent = '0';
    firstNumber = '';
    secondNumber = '';
    currentOperation = null;
    previousOperation = null;
}

function resetScreen() {
    screen.textContent = '';
}

function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) return null;
    return a / b;
}

function root(a, b) {
    if (a < 0) return null;
    return Math.pow(a, 1/b);
}

function percentage(a, b) {
    return a * b / 100;
}


function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return substract(a, b);
        case 'x':
            return multiply(a, b);
        case '÷':
            return divide(a, b);
        case '√':
            return root(a, b);
        case '%':
            return percentage(a, b);
        default:
            return null;
    }
}