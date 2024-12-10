export default class FormValidator {
  constructor(options, formElement) {
    this._options = options; // Access to CSS selectors or class names
    this._formElement = formElement; // Ensures Validator is tied to specific form element
    this._submitButton = this._formElement.querySelector(
      this._options.submitButtonSelector // Find and store submit button using selector in options
    );
  }

  // Private Methods // ======
  _showInputError(inputElement) {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._options.inputErrorClass);
    errorMessageEl.textContent = inputElement.validationMessage;
    errorMessageEl.classList.add(this._options.errorClass);
  }

  _hideInputError(inputElement) {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._options.inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._options.errorClass);
  }

  // Check forms Validity - checkInputValidity
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      return this._showInputError(inputElement);
    }
    this._hideInputError(inputElement);
  }

  // Changing state of Submit button - toggleButtonState

  _hasInvalidInput() {
    return this._inputElements.some(
      (inputElement) => !inputElement.validity.valid
    );
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this._submitButton.classList.remove(this._options.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputElements = Array.from(
      this._formElement.querySelectorAll(this._options.inputSelector)
    );

    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
    this._toggleButtonState();
  }

  // Public Methods // ======
  // enableValidation
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputElements.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  disableButton() {
    this._submitButton.classList.add(this._options.inactiveButtonClass);
    this._submitButton.disabled = true;
  }
}
