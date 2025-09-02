document.addEventListener("DOMContentLoaded", () => {
  const firstNumberInput = document.getElementById("inputA");
  const secondNumberInput = document.getElementById("inputB");
  const resultElement = document.getElementById("result");

  const addButton = document.getElementById("addBtn");
  const subtractButton = document.getElementById("subtractBtn");
  const multiplyButton = document.getElementById("multiplyBtn");
  const divideButton = document.getElementById("divideBtn");

  function parseInputs() {
    const firstRaw = firstNumberInput.value;
    const secondRaw = secondNumberInput.value;

    const first = parseFloat(firstRaw);
    const second = parseFloat(secondRaw);

    if (Number.isNaN(first) || Number.isNaN(second)) {
      return { error: "Please enter valid numbers in both fields." };
    }

    return { first, second };
  }

  function showResult(message, isError = false) {
    resultElement.textContent = message;
    resultElement.classList.toggle("error", isError);
  }

  addButton.addEventListener("click", () => {
    const parsed = parseInputs();
    if (parsed.error) return showResult(parsed.error, true);
    const { first, second } = parsed;
    showResult(`Result: ${first + second}`);
  });

  subtractButton.addEventListener("click", () => {
    const parsed = parseInputs();
    if (parsed.error) return showResult(parsed.error, true);
    const { first, second } = parsed;
    showResult(`Result: ${first - second}`);
  });

  multiplyButton.addEventListener("click", () => {
    const parsed = parseInputs();
    if (parsed.error) return showResult(parsed.error, true);
    const { first, second } = parsed;
    showResult(`Result: ${first * second}`);
  });

  divideButton.addEventListener("click", () => {
    const parsed = parseInputs();
    if (parsed.error) return showResult(parsed.error, true);
    const { first, second } = parsed;
    if (second === 0) return showResult("Cannot divide by zero.", true);
    showResult(`Result: ${first / second}`);
  });
});


