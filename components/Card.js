export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    //".card__like-button"
    this._likeButton.addEventListener("click", () => this._handleLikeIcon());

    //".card__delete-button"
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteCard()
    );

    //".card__image"
    this._cardImage.addEventListener("click", () =>
      this._handleImageClick({ name: this._name, link: this._link })
    );
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    // get the card view
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    // set the card image and title
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    // set the src and alt attributes for the image, and the title text
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    // set event listeners
    this._setEventListeners();

    // return the card
    return this._cardElement;
  }
}
