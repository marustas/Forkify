import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

const controlRecipe = async function () {

  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;

    recipeView.renderSpinner();

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (err) { alert(err.message) }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
}

init();

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////