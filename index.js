const input = document.querySelector(".number-input");
const result = document.querySelector(".convert-result");
const buttonsFrom = document.querySelectorAll(".btn-from");
const buttonsTo = document.querySelectorAll(".btn-to");
const activeBtnFrom = document.getElementsByClassName("active-from");
const activeBtnTo = document.getElementsByClassName("active-to");
const formElement = document.querySelector(".input-container");
const formInput = formElement.querySelector(".number-input");
const formError = formElement.querySelector(".error");
const textError = "— в этой системе не может быть такого числа";
const obj = {
  binary: {
    binary: function (num) {
      return num;
    },
    octal: function (num) {
      return num
        .toString()
        .split("")
        .reverse()
        .reduce((acc, val, i) => (acc += val * Math.pow(2, i)), 0)
        .toString(8);
    },
    decimal: function (num) {
      return num
        .toString()
        .split("")
        .reverse()
        .reduce((acc, val, i) => (acc += val * Math.pow(2, i)), 0);
    },
    hexadecimal: function (num) {
      return num
        .toString()
        .split("")
        .reverse()
        .reduce((acc, val, i) => (acc += val * Math.pow(2, i)), 0)
        .toString(16);
    },
  },
  octal: {
    binary: function (num) {
      return num
        .toString()
        .split("")
        .reverse()
        .reduce((acc, val, i) => (acc += val * Math.pow(8, i)), 0)
        .toString(2);
    },
    octal: function (num) {
      return num;
    },
    decimal: function (num) {
      return num
        .toString()
        .split("")
        .reverse()
        .reduce((acc, val, i) => (acc += val * Math.pow(8, i)), 0)
        .toString();
    },
    hexadecimal: function (num) {
      return num
        .toString()
        .split("")
        .reverse()
        .reduce((acc, val, i) => (acc += val * Math.pow(8, i)), 0)
        .toString(16);
    },
  },
  decimal: {
    binary: function (num) {
      return num.toString(2);
    },
    octal: function (num) {
      return num.toString(8);
    },
    decimal: function (num) {
      return num.toString();
    },
    hexadecimal: function (num) {
      console.log(num);
      return num.toString(16);
    },
  },
  hexadecimal: {
    binary: function (num) {
      return num.toString(2);
    },
    octal: function (num) {
      return num.toString(8);
    },
    decimal: function (num) {
      return num.toString();
    },
    hexadecimal: function (num) {
      return num.toString(16);
    },
  },
};

console.log(activeBtnFrom[0].value, activeBtnTo[0]);

for (var i = 0; i < buttonsFrom.length; i++) {
  buttonsFrom[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active-from");
    current[0].className = current[0].className.replace(" active-from", "");
    this.className += " active-from";
  });
}

for (var i = 0; i < buttonsTo.length; i++) {
  buttonsTo[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active-to");
    current[0].className = current[0].className.replace(" active-to", "");
    this.className += " active-to";
  });
}

function convert() {
  let res = 0;
  Boolean(input.value.match(/\D/gi))
    ? (res = parseInt(input.value, 16))
    : (res = Number(input.value));
  console.log(res);
  const answer = obj[activeBtnFrom[0].value][activeBtnTo[0].value](res);
  return answer;
}

function validSystemFrom() {
  let bin = input.value.match(/[2-9A-Z]/gi);
  let oct = input.value.match(/[8-9A-Z]/gi);
  let dec = input.value.match(/[A-Z]/gi);
  let hex = input.value.match(/[G-Z]/gi);
  if (activeBtnFrom[0].value === "binary") {
    console.log(bin);
    return Boolean(bin);
  }
  if (activeBtnFrom[0].value === "octal") {
    console.log(oct);
    return Boolean(oct);
  }
  if (activeBtnFrom[0].value === "decimal") {
    console.log(dec);
    return Boolean(dec);
  }

  if (activeBtnFrom[0].value === "hexadecimal") {
    console.log(hex);
    return Boolean(hex);
  }
}

const showInputError = (element, errorMessage) => {
  element.closest("form").classList.add("input-container-type-error");
  element.classList.add("number-input-type-error");
  formError.textContent = errorMessage;
  formError.classList.add("error-active");
  result.textContent = "...";
};

const hideInputError = (element) => {
  element.closest("form").classList.remove("input-container-type-error");
  element.classList.remove("number-input-type-error");
  formError.classList.remove("error-active");
  formError.textContent = "";
};

const isValid = () => {
  if (!formInput.validity.valid) {
    showInputError(formInput, "- введите число");
  } else if (validSystemFrom()) {
    showInputError(formInput, textError);
  } else {
    hideInputError(formInput);
  }
};

formInput.addEventListener("input", isValid);

input.addEventListener("keyup", () => {
  console.log("input change");
  result.textContent = convert();
});

document.body.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("active-to") ||
    e.target.classList.contains("active-from")
  ) {
    isValid();
    result.textContent = convert();
  }
});
