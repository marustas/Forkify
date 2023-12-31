import { URL } from "./config";
import { getJSON } from "./views/helpers";
export const state = {
    recipe: {},
}

export const loadRecipe = async function (id) {
    try {
        const url = `${URL}/${id}`;
        const data = await getJSON(url);

        const { recipe } = data.data;

        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        }
    } catch (error) {
        throw error;
    }
}