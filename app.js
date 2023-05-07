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
    }
    secondNumber = screen.textContent;
    screen.textContent = roundResult(operate(currentOperation, firstNumber, secondNumber));
    currentOperation = null;
}

function setOperation(operator) {
    if (currentOperation !== null) {
        calculate();
    }
    firstNumber = screen.textContent;
    shouldResetScreen = true;
    if (operator !== '=') {
        currentOperation = operator;
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
    screen.textContent = ''
}

function add(a, b) {
    return a + b
}

function substract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    if (b === 0) return null
    return a / b
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000
  }

function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)
    switch (operator) {
        case '+':
            return add(a, b)
        case '-':
            return substract(a, b)
        case 'x':
            return multiply(a, b)
        case '÷':
            return divide(a, b)
        default:
            return null
    }
}