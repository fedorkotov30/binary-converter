const input = document.querySelector(".number-input");
const result = document.querySelector(".convert-result");
const buttonsFrom = document.querySelectorAll(".btn-from");
const buttonsTo = document.querySelectorAll(".btn-to");
const activeBtnFrom = document.getElementsByClassName("active-from");
const activeBtnTo = document.getElementsByClassName("active-to");
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
      return num.toString(16);
    },
  },
  hexadecimal: {
    binary: function (num) {
      return num
        .toString()
        .split("")
        .reverse()
        .reduce((acc, val, i) => (acc += val * Math.pow(16, i)), 0)
        .toString(2);
    },
    octal: function (num) {
      return num
        .toString()
        .split("")
        .reverse()
        .reduce((acc, val, i) => (acc += val * Math.pow(16, i)), 0)
        .toString(8);
    },
    decimal: function (num) {
      return num
        .toString()
        .split("")
        .reverse()
        .reduce((acc, val, i) => (acc += val * Math.pow(16, i)), 0)
        .toString();
    },
    hexadecimal: function (num) {
      return num;
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

document.body.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("active-to") ||
    e.target.classList.contains("active-from")
  ) {
    const res = Number(input.value);
    result.textContent = obj[activeBtnFrom[0].value][activeBtnTo[0].value](res);
  }
});

const formElement = document.querySelector(".input-container");
const formInput = formElement.querySelector(".number-input");
const formError = formElement.querySelector(".error");

// Функция, которая добавляет класс с ошибкой
const showInputError = (element, errorMessage) => {
  element.closest("form").classList.add("input-container-type-error");
  element.classList.add("number-input-type-error");
  formError.textContent = errorMessage;
  formError.classList.add("error-active");
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (element) => {
  element.closest("form").classList.remove("input-container-type-error");
  element.classList.remove("number-input-type-error");
  formError.classList.remove("error-active");
  // Очистим ошибку
  formError.textContent = "";
};

// Функция, которая проверяет валидность поля
const isValid = () => {
  if (input.value.length > 8) {
    formInput.closest("form").classList.add("input-container-type-error");
    formInput.classList.add("number-input-type-error");
    formError.textContent = "— в этой системе не может быть такого числа";
    formError.classList.add("error-active");
    console.log("oshibka");
  } else if (!formInput.validity.valid) {
    // Передадим сообщение об ошибке вторым аргументом
    showInputError(formInput, formInput.validationMessage);
  } else {
    hideInputError(formInput);
  }
};

// Вызовем функцию isValid на каждый ввод символа
formInput.addEventListener("input", isValid);
