import { createFilters, createRecipeCard } from "../scripts/recipes.js";
export async function getRecipes() {
  const response = await fetch("/data/recipes.json");
  const data = await response.json();
  const { recipes } = data;
  console.log(recipes);
  return {
    recipes: [...recipes],
  };
}

export async function displayRecipes(recipes) {
  const recipesSection = document.getElementById("recipes");
  recipes.forEach((recipe) => {
    const recipeModel = createRecipeCard(recipe);
    const recipeCard = recipeModel.getRecipeCard();
    recipesSection.appendChild(recipeCard);
  });
}

async function init() {
  const { recipes } = await getRecipes();
  await displayRecipes(recipes);

  createFilters();
}

init();
