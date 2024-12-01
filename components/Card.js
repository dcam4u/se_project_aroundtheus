export default class Card {
  constructor(
    { name, link },
    cardSelector,
    handleImageClick
    // openModal,
    // previewImageModal,
    // previewImageTitle,
    // previewImage
  ) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    // this._openModal = openModal;
    // this._previewImageModal = previewImageModal;
    // this._previewImageTitle = previewImageTitle;
    // this._previewImage = previewImage;
  }

  _setEventListeners() {
    //".card__like-button"
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeIcon());

    //".card__delete-button"
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDeleteCard());

    //".card__image"
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleImageClick({ name: this._name, link: this._link })
      );
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  // _handleImageClick() {
  //   this._openModal(this._previewImageModal);
  //   this._previewImageTitle.textContent = this._name;
  //   this._previewImage.alt = this._name;
  //   this._previewImage.src = this._link;
  // }
  //
  getView() {
    // get the card view
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    // set the card image and title
    const cardImage = this._cardElement.querySelector(".card__image");
    const cardTitle = this._cardElement.querySelector(".card__title");

    // set the src and alt attributes for the image, and the title text
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    // set event listeners
    this._setEventListeners();

    // return the card
    return this._cardElement;
  }
}
