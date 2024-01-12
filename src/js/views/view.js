import icons from "url:../../img/icons.svg";

export default class View {
  _data;

  update(data) {
    this._data = data;

    const newMarkup = this._generateMarkup();

    //create a new DOM object 
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newElement, i) => {
      const curElement = curElements[i];

      if (!newElement.isEqualNode(curElement) && newElement.firstChild && newElement.firstChild.nodeValue.trim() !== '') {
        curElement.textContent = newElement.textContent;
      }

      if (!newElement.isEqualNode(curElement)) {
        Array.from(newElement.attributes).forEach(newAttribute =>
          curElement.setAttribute(newAttribute.name, newAttribute.value));
      }
    })
  }

  renderSpinner() {
    const markup = `
        <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
      `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._errorMessage) {
    const markup = `
        <div class="error">
                <div>
                  <svg>
                    <use href="${icons}icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>
              `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderMessage();

    this._data = data;

    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}