const calculator = {
    displayValue: "0",
    firstOperand: null,
    waiting: false, //obj property to see if we are waiting for 2nd operand
    operator: null,
};
 
function updateDisplay() {
    const display = document.querySelector("#calc-display");
    display.value = calculator.displayValue;
}

const numBtn = document.querySelectorAll(".num");
numBtn.forEach(num => {
    num.addEventListener("click", (e) => {
        inputNum(e.target.value);
        updateDisplay();
    });
});

const decBtn = document.getElementById("dot");
decBtn.addEventListener("click", (e) => {
    inputDecimal(e.target.value);
    updateDisplay();
})

const operatorBtn = document.querySelectorAll(".operator");
operatorBtn.forEach(operator => {
    operator.addEventListener("click", (e) => {
        handleOperator(e.target.value);
        updateDisplay();
    });
});

const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", clearCalculator);

const delBtn = document.getElementById("del");
delBtn.addEventListener("click", delDigit);

function inputNum(digit) {
    const { displayValue ,firstOperand, waiting, operator} = calculator;
    if (waiting){
        calculator.displayValue = digit;
        calculator.waiting = false;
    } else {
         //if current displayValue is 0, make the displayValue the digit
        //if not 0, digit gets appended to displayValue
        calculator.displayValue = displayValue === "0" ? digit : calculator.displayValue += digit;
    }
}

function inputDecimal(dec) {
    if (!calculator.displayValue.includes(".")){
        calculator.displayValue += dec;
    } else {
        return;
    }
}

function handleOperator(nextOperator){
    const {firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    //override existing operator if user enters in another operator 
    if(operator && calculator.waiting) {
        calculator.operator = nextOperator;
        return
    }

    if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }

    calculator.waiting = true;
    calculator.operator = nextOperator;
}

function calculate(numOne, numTwo, operator){
    if (operator === "/"){
        return numOne / numTwo;
    } else if (operator === "*"){
        return numOne * numTwo;
    } else if (operator === "-"){
        return numOne - numTwo;
    } else if (operator === "+"){
        return numOne + numTwo;
    } else {
        return numTwo;
    }
}

function clearCalculator() {
    calculator.displayValue = "";
    calculator.firstOperand = null;
    calculator.waiting = false;
    calculator.operator = null;
    updateDisplay();
}

function delDigit() {
    if (calculator.displayValue !== "") {
        calculator.displayValue = calculator.displayValue.slice(0, -1);
        updateDisplay();
    }
}