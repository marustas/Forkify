import previewView from "./previewView";
import View from "./view";

class BookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No bookmarks yet. Find a nice recepi and bookmark it.';
    _message = '';

    _generateMarkup() {
        return this._data.map(result => previewView.render(result, false)).join('');
    }

    addHandlerRender(handler) {
        window.addEventListener('load', handler);
    }

}

export default new BookmarksView();