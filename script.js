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
  return x, y;
}

const num1 = null;
const num2 = null;
const op = null;

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

const result = document.querySelector(".result-screen p");
const buttons = document.querySelectorAll("button");
const buttonsContainer = document.querySelector(".buttons");

buttonsContainer.addEventListener("click", (e) => {
  if (e.target.id === "clear") {
    result.textContent = "";
  } else if (e.target.textContent === "<=") {
    result.textContent = result.textContent.slice(0, -1);
  } else if (e.target.textContent != "=") {
    result.textContent += e.target.textContent;
    result.scrollLeft += 100;
  }
});

// Check if expression is valid
