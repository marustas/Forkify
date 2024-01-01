import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';


if (module.hot) {
  module.hot.accept();
}

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderMessage();
  }
};

const controlSearchReuslts = async function () {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();

    if (!query) return

    await model.loadSearchResults(query);

    resultsView.render(model.state.search.results)
  } catch (error) {
    recipeView.renderMessage(error);
  }
}

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchReuslts);
}

init();

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////