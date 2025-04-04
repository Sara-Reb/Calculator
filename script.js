function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function operate(num1, num2, op) {
  if (op === "+") {
    return add(num1, num2);
  } else if (op === "-") {
    return subtract(num1, num2);
  } else if (op === "x" || op === "*") {
    return multiply(num1, num2);
  } else if (op === "÷" || op === "/") {
    return divide(num1, num2);
  }
}

const result = document.querySelector(".result-screen .answer");
const input = document.querySelector(".result-screen .input");
const buttons = document.querySelectorAll("button");
const buttonsContainer = document.querySelector(".buttons");

let num1 = null;
let num2 = null;
let op = null;

let currNum = null;

buttonsContainer.addEventListener("click", (e) => {
  // Prevent drag event
  if (e.target.childNodes.length != 1) {
    return;
  }
  // Prevent click event when not triggered by the mouse
  else if (e.pointerType === "") {
    return;
  }

  let digit = e.target.textContent;
  main(digit);
});

document.addEventListener("keydown", (e) => {
  if (
    /['0-9'\+\-\*\/\=\.]/.test(e.key) ||
    ["Enter", "Backspace"].includes(e.key)
  ) {
    let digit = e.key;
    if (digit === "/") {
      digit = "÷";
    } else if (digit === "*") {
      digit = "x";
    }
    main(digit);
  }
});

function main(digit) {
  if (input.textContent === "dummy") {
    input.textContent = "";
  }
  // Clear all
  else if (digit === "CLEAR") {
    clearScreen();
  }

  // Delete last digit
  else if (digit === "<--" || digit === "Backspace") {
    deleteLastDigit();
  }

  // Add operators and save first number
  else if (["+", "-", "*", "x", "/", "÷"].includes(digit)) {
    if (op === null) {
      if (input.textContent === "" || isNaN(Number(input.textContent))) {
        return;
      }
      num1 = Number(input.textContent);
    } else {
      if (currNum === null) {
        return;
      }
      answer = calculateResult();
      num1 = answer;
      num2 = null;
    }
    currNum = null;
    op = digit;
    input.textContent += op;
  }

  // Add numeric digits
  else if (digit != "=" && digit != "Enter") {
    if (currNum === null) {
      currNum = digit;
      input.textContent += digit;
    }
    //Check if valid number
    else if (!isNaN(Number(currNum + digit))) {
      currNum += digit;
      input.textContent += digit;
    }
  }

  // = is clicked
  else {
    if (currNum === null || op === null) {
      return;
    }
    answer = calculateResult();
    num1 = answer;
    num2 = null;
    currNum = num1;
    op = null;
  }
}

function clearScreen() {
  input.textContent = "";
  result.textContent = "";
  currNum = null;
  num1 = null;
  num2 = null;
  op = null;
}

function deleteLastDigit() {
  if (
    ["÷", "x", "+", "-"].some((item) => item === input.textContent.slice(-1))
  ) {
    op = null;
    currNum = num1;
    num1 = null;
  } else {
    currNum = String(currNum).slice(0, -1);
  }
  input.textContent = input.textContent.slice(0, -1);
}

function calculateResult() {
  if (isNaN(currNum)) {
    return;
  }
  num2 = Number(currNum);
  let answer;
  if ((op === "÷" || op === "/") && num2 === 0) {
    answer = "dummy";
    result.textContent = "";
    input.textContent = answer;
    num1 = num2 = currNum = op = null;
  } else {
    answer = parseFloat(operate(num1, num2, op).toPrecision(8));
    result.textContent = input.textContent;
    input.textContent = parseFloat(answer.toPrecision(8));
  }
  return answer;
}
