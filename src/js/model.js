import { URL } from "./config";
import { getJSON } from "./helpers";
import { RESULTS_PER_PAGE } from "./config";

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        resultsPerPage: RESULTS_PER_PAGE,
        page: 1
    },
    bookmarks: []
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
        };

        if (state.bookmarks.some(bookmark => bookmark.id === id))
            state.recipe.bookmarked = true;
        else
            state.recipe.bookmarked = false;
    } catch (error) {
        throw error;
    }
}

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;
        const data = await getJSON(`${URL}?search=${query}`);

        state.search.results = data.data.recipes.map((recipe) => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url,
            }
        })

        state.search.page = 1;
    } catch (error) { throw error; }
}

export const getSearchResultsPage = function (page = state.search.page) {
    state.search.page = page;

    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;

    return state.search.results.slice(start, end)
}

export const updateServings = function (newServings) {
    state.recipe.ingredients.forEach(ingredient => { ingredient.quantity = newServings / state.recipe.servings * ingredient.quantity });

    state.recipe.servings = newServings;
}

export const addBookmark = function (recipe) {
    state.bookmarks.push(recipe);

    if (recipe.id = state.recipe.id) state.recipe.bookmarked = true;
    // persistBookmarks();
}

export const deleteBookmark = function (id) {
    const index = state.bookmarks.findIndex(elem => elem.id === id);

    state.bookmarks.splice(index, 1);

    if (id = state.recipe.id) state.recipe.bookmarked = false;
    // persistBookmarks();
}

// const persistBookmarks = function () {
//     localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
// }

// const init = function () {
//     const storage = localStorage.getItem('bookmarks');
//     if (storage) state.bookmarks = JSON.parse(storage);
// }

// init();