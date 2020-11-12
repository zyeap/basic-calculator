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

function inputNum(digit) {
    const { displayValue } = calculator;
    //if current displayValue is 0, make the displayValue the digit
    //if not 0, digit gets appended to displayValue
    calculator.displayValue = displayValue === "0" ? digit : calculator.displayValue += digit;
}

function inputDecimal(dec) {
    if (!calculator.displayValue.includes(".")){
        calculator.displayValue += dec;
    } else {
        return;
    }
}
