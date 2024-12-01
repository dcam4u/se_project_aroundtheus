// ============================
//          IMPORTS
// ============================
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

// ============================
//       CONFIGURATION
// ============================
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form_input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// ============================
//       DOM ELEMENTS
// ============================
// Wrappers
const cardListElement = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const previewImageModal = document.querySelector("#preview-image-modal");

// Forms
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");

// Inputs
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__form_input_type_title"
);
const cardUrlInput = addCardFormElement.querySelector(
  ".modal__form_input_type_url"
);

// Buttons
const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileModalCloseButton = profileEditModal.querySelector(
  "#profile-modal-close-button"
);
const addCardModalCloseButton = addCardModal.querySelector(
  "#add-card-modal-close-button"
);
const previewImageModalCloseButton = previewImageModal.querySelector(
  "#preview-image-modal-close-button"
);

// ============================
//      HELPER FUNCTIONS
// ============================
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeEscPress);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeEscPress);
}

function renderCard(cardElement) {
  cardListElement.prepend(cardElement);
}

function handleImageClick(cardData) {
  openModal(previewImageModal);
  const previewImageTitle = previewImageModal.querySelector(
    ".modal__preview-image-title"
  );
  const previewImage = previewImageModal.querySelector(".modal__preview-image");

  previewImageTitle.textContent = cardData.name;
  previewImage.alt = cardData.name;
  previewImage.src = cardData.link;
}

function closeOverlay(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

function closeEscPress(evt) {
  if (evt.key === "Escape" || evt.key === "Esc") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
}

// ============================
//      EVENT HANDLERS
// ============================
function handleProfileEditSubmit(e) {
  e.preventDefault();
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;

  const card = new Card({ name, link }, "#card-template", handleImageClick);
  renderCard(card.getView());

  closeModal(addCardModal);
  e.target.reset();
}

// ============================
//       INITIALIZATION
// ============================
// Render Initial Cards
initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template", handleImageClick);
  renderCard(card.getView());
});

// Enable Validation
const addCardFormValidator = new FormValidator(config, addCardFormElement);
const profileFormValidator = new FormValidator(config, profileEditForm);

addCardFormValidator.enableValidation();
profileFormValidator.enableValidation();

// Add Event Listeners
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

profileEditButton.addEventListener("click", () => {
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

previewImageModalCloseButton.addEventListener("click", () =>
  closeModal(previewImageModal)
);

addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

const allModals = [profileEditModal, addCardModal, previewImageModal];
allModals.forEach((modal) => {
  modal.addEventListener("click", closeOverlay);
});
