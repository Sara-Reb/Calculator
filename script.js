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
  } else if (op === "x") {
    return multiply(num1, num2);
  } else if (op === "÷") {
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
  if (input.textContent === "dummy") {
    input.textContent = "";
  } else if (e.target.childNodes.length != 1) {
    return;
  }
  // Clear all
  else if (e.target.textContent === "CLEAR") {
    input.textContent = "";
    result.textContent = "";
    currNum = null;
    num1 = null;
    num2 = null;
    op = null;
  }

  // Delete last digit
  else if (e.target.textContent === "<--") {
    if (
      ["÷", "x", "+", "-"].some((item) => item === input.textContent.slice(-1))
    ) {
      op = null;
      currNum = num1;
    } else {
      currNum = String(currNum).slice(0, -1);
    }
    input.textContent = input.textContent.slice(0, -1);
    console.log(currNum);
  }

  // Add operators and save first number
  else if (e.target.classList.contains("op")) {
    if (op === null && input.textContent != "") {
      op = e.target.textContent;
      num1 = Number(input.textContent);
      currNum = null;
      input.textContent += e.target.textContent;
    } else if (op != null) {
      num2 = Number(currNum);
      if (op === "÷" && num2 === 0) {
        answer = "dummy";
        result.textContent = "";
        input.textContent = answer;
        return;
      } else {
        let answer = parseFloat(operate(num1, num2, op).toPrecision(8));
        result.textContent = input.textContent;
        input.textContent = parseFloat(answer.toPrecision(12));
      }
      eFloat(answer.toPrecision(12));
      num1 = answer;
      currNum = null;
      num2 = null;
      op = e.target.textContent;
      input.textContent += e.target.textContent;
    }
  }

  // Add numeric digits
  else if (e.target.id != "equal") {
    if (currNum === null) {
      currNum = e.target.textContent;
      input.textContent += e.target.textContent;
    }
    //Check if valid number
    else if (!isNaN(Number(currNum + e.target.textContent))) {
      currNum += e.target.textContent;
      input.textContent += e.target.textContent;
    }
  } else {
    if (currNum === null) {
      return;
    }
    num2 = Number(currNum);
    if (op === "÷" && num2 === 0) {
      answer = "dummy";
      result.textContent = "";
      input.textContent = answer;
    } else {
      let answer = parseFloat(operate(num1, num2, op).toPrecision(8));
      result.textContent = input.textContent;
      input.textContent = parseFloat(answer.toPrecision(8));
    }
    currNum = null;
    op = null;
  }

  console.log("curr", currNum, "num1", num1, "num2", num2, "op", op);
});
