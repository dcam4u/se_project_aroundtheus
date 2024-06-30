// enabling validation by calling enableValidation()
// pass all the settings on call

function hideInputError(
  formElement,
  inputElements,
  { inputErrorClass, errorClass }
) {
  const errorMessageEl = formElement.querySelector(
    `#${inputElements.id}-error`
  );
  inputElements.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

function showInputError(
  formElement,
  inputElements,
  { inputErrorClass, errorClass }
) {
  const errorMessageEl = formElement.querySelector(
    `#${inputElements.id}-error`
  );
  inputElements.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputElements.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function checkInputValidity(formElement, inputElements, options) {
  if (!inputElements.validity.valid) {
    return showInputError(formElement, inputElements, options);
  }
  hideInputError(formElement, inputElements, options);
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputElements) => inputElements.validity.valid);
}

//disble button
//enable button

function toggleButtonState(
  inputElements,
  submitButton,
  { inactiveButtonClass }
) {
  if (hasInvalidInput(inputElements)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
    return;
  }
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function setEventListeners(formElement, options) {
  const { inputSelector } = options;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  const submitButton = formElement.querySelector(".modal__button");

  inputElements.forEach((inputElements) => {
    inputElements.addEventListener("input", (evt) => {
      checkInputValidity(formElement, inputElements, options);
      toggleButtonState(inputElements, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formElement = [...document.querySelectorAll(options.formSelector)];
  formElement.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      console.log(formElement);
    });

    setEventListeners(formElement, options);
  });
}

// Look for all inputs inside of form
// Loop through all the inputs to see if all are valid
// if input is not valid
// Get validation message
// add error class to input
// display error message
// disable button
// if all inputs are valid
// enable button
// reset error messages

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form_input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(config);
