import { getRecipes } from "./index.js";
import { createRecipeCard, updateRecipeCount } from "./recipes.js";
let selectIngredients = [];
let selectAppareils = [];
let selectUstensils = [];

function createIngredientTag(ingredient) {
  const recipesSection = document.getElementById("ingredients");
  const tagsInSub = document.getElementById("tagsInSub");
  const TagsContainer = document.createElement("div");
  TagsContainer.classList.add("flex", "flex-wrap", "gap-2", "py-1");
  const tag = document.createElement("span");
  tag.classList.add(
    "inline-flex",
    "items-center",
    "py-3",
    "pl-3",
    "pr-2",
    "justify-between",
    "w-48",
    "bg-yellow-400",
    "rounded-lg",
    "text-sm"
  );
  tag.textContent = ingredient;
  tag.tabIndex = 0; // Make it focusable
  const removeBtn = document.createElement("button");
  removeBtn.classList.add("mx-2", "bg-none", "border-none", "cursor-pointer");
  removeBtn.textContent = "x";
  removeBtn.addEventListener("click", () => {
    tag.remove();
    TagsContainer.remove();
    removeIngredient(ingredient);
    //filterRecipesByIngredient(selectIngredients);
  });
  removeBtn.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      tag.remove();
    }
  });
  tag.appendChild(removeBtn);
  const inputElement = tagsInSub.querySelector("input");
  if (inputElement) {
    tagsInSub.insertBefore(tag, inputElement.nextSibling);
  } else {
    // If for some reason the input element is not there, append at the end
    tagsInSub.appendChild(tag);
  }
  //TagsContainer.appendChild(tag);
  recipesSection.appendChild(TagsContainer);
  return tag;
}

function removeIngredient(ingredient) {
  selectIngredients = selectIngredients.filter(
    (selected) => selected.toLowerCase() !== ingredient.toLowerCase()
  );
  filterRecipes(selectIngredients, selectAppareils, selectUstensils);
}

function createAppareilTag(appareil) {
  const recipesSection = document.getElementById("appareils");
  const tagsApSub = document.getElementById("tagsApSub");
  const TagsContainer = document.createElement("div");
  TagsContainer.classList.add("flex", "flex-wrap", "gap-2", "py-1");
  const tag = document.createElement("span");
  tag.classList.add(
    "inline-flex",
    "items-center",
    "py-3",
    "pl-3",
    "pr-2",
    "justify-between",
    "w-48",
    "bg-yellow-400",
    "rounded-lg",
    "text-sm"
  );
  tag.textContent = appareil;
  tag.tabIndex = 0; // Make it focusable
  const removeBtn = document.createElement("button");
  removeBtn.classList.add("mx-2", "bg-none", "border-none", "cursor-pointer");
  removeBtn.textContent = "x";
  removeBtn.addEventListener("click", () => {
    tag.remove();
    TagsContainer.remove();
    removeAppareil(appareil);
    //filterRecipesByAppareil(selectAppareils);
  });
  removeBtn.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      tag.remove();
    }
  });
  tag.appendChild(removeBtn);
  const inputElement = tagsApSub.querySelector("input");
  if (inputElement) {
    tagsApSub.insertBefore(tag, inputElement.nextSibling);
  } else {
    // If for some reason the input element is not there, append at the end
    tagsApSub.appendChild(tag);
  }
  //TagsContainer.appendChild(tag);
  recipesSection.appendChild(TagsContainer);
  return tag;
}

function removeAppareil(appareil) {
  selectAppareils = selectAppareils.filter(
    (selected) => selected.toLowerCase() !== appareil.toLowerCase()
  );
  filterRecipes(selectIngredients, selectAppareils, selectUstensils);
}

function createUstensilTag(ustensil) {
  const recipesSection = document.getElementById("ustensils");
  const tagsUsSub = document.getElementById("tagsUsSub");
  const TagsContainer = document.createElement("div");
  TagsContainer.classList.add("flex", "flex-wrap", "gap-2", "py-1");
  const tag = document.createElement("span");
  tag.classList.add(
    "inline-flex",
    "items-center",
    "py-3",
    "pl-3",
    "pr-2",
    "justify-between",
    "w-48",
    "bg-yellow-400",
    "rounded-lg",
    "text-sm"
  );
  tag.textContent = ustensil;
  tag.tabIndex = 0; // Make it focusable
  const removeBtn = document.createElement("button");
  removeBtn.classList.add("mx-2", "bg-none", "border-none", "cursor-pointer");
  removeBtn.textContent = "x";
  removeBtn.addEventListener("click", () => {
    tag.remove();
    TagsContainer.remove();
    removeUstensil(ustensil);
    //filterRecipesByUstensil(selectUstensils);
  });
  removeBtn.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      tag.remove();
    }
  });
  tag.appendChild(removeBtn);
  const inputElement = tagsUsSub.querySelector("input");
  if (inputElement) {
    tagsUsSub.insertBefore(tag, inputElement.nextSibling);
  } else {
    // If for some reason the input element is not there, append at the end
    tagsUsSub.appendChild(tag);
  }
  //TagsContainer.appendChild(tag);
  recipesSection.appendChild(TagsContainer);
  return tag;
}

function removeUstensil(ustensil) {
  // Update the array of selected ustensils
  selectUstensils = selectUstensils.filter(
    (selected) => selected.toLowerCase() !== ustensil.toLowerCase()
  );
  filterRecipes(selectIngredients, selectAppareils, selectUstensils);
}
// Assuming displayRecipes is defined elsewhere and correctly imported
export async function displayRecipes(recipes) {
  const recipesSection = document.getElementById("recipes"); // Make sure this is the correct ID
  recipesSection.innerHTML = ""; // Clear the current recipes
  recipes.forEach((recipe) => {
    const recipeCardModel = createRecipeCard(recipe); // Assuming createRecipeCard is defined elsewhere
    const recipeCard = recipeCardModel.getRecipeCard();
    recipesSection.appendChild(recipeCard);
    updateRecipeCount(recipes.length);
  });
}
async function getAllIngredients() {
  const response = await fetch("/data/recipes.json");
  const data = await response.json();
  const ingredients = new Set(); // Use a Set to store unique ingredients

  data.recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      ingredients.add(ingredient.ingredient.toLowerCase()); // Add each ingredient to the Set
    });
  });

  return Array.from(ingredients); // Convert the Set to an Array to return
}

// This function should be accessible outside of populateIngredientsDropdown()
async function filterRecipesByIngredient(ingredient) {
  const data = await getRecipes(); // Retrieves all recipes
  const recipes = data.recipes;

  let filteredRecipes = recipes;
  if (ingredient.length > 0) {
    filteredRecipes = recipes.filter((recipe) =>
      recipe.ingredients.some(
        (item) => item.ingredient.toLowerCase() === ingredient.toLowerCase()
      )
    );
  }
  displayRecipes(filteredRecipes);
  filterRecipes(selectIngredients, selectAppareils, selectUstensils);
}

export async function populateIngredientsDropdown() {
  const allIngredients = await getAllIngredients();
  const dropdown = document.getElementById("tagsIn"); // Ensure this is the correct dropdown ID
  const divContainer = document.createElement("div");
  divContainer.classList.add("py-1");
  divContainer.id = "tagsInSub";
  const inputElement = document.createElement("input");
  inputElement.setAttribute("type", "text");
  inputElement.setAttribute("placeholder", "Search...");
  inputElement.classList.add(
    "w-full",
    "px-3",
    "py-2",
    "border",
    "rounded-md",
    "text-gray-900",
    "leading-tight"
  );
  divContainer.appendChild(inputElement);

  // Define displayFilteredIngredients function to update the ingredients dropdown list
  function displayFilteredIngredients(filterText) {
    const currentIngredients = divContainer.querySelectorAll("p");
    currentIngredients.forEach((p) => p.remove());

    allIngredients
      .filter((ingredient) =>
        ingredient.toLowerCase().includes(filterText.toLowerCase())
      )
      .forEach((ingredient) => {
        const option = document.createElement("p");
        option.classList.add(
          "text-gray-700",
          "block",
          "px-3",
          "py-2",
          "text-sm",
          "hover:bg-gray-100"
        );
        option.textContent = ingredient;
        option.tabIndex = 0; // Make it focusable
        option.addEventListener("click", () => {
          console.log(`Ingredient clicked: ${ingredient}`);
          if (!selectIngredients.includes(ingredient)) {
            selectIngredients.push(ingredient);
            createIngredientTag(ingredient);
            filterRecipesByIngredient(ingredient).then(() => {
              console.log(`Recipes filtered by ingredient: ${ingredient}`);
            });
            filterRecipes(selectIngredients, selectAppareils, selectUstensils);
          }
        });
        option.addEventListener("keypress", (e) => {
          if (e.key === "Enter") {
            filterRecipesByIngredient(ingredient);
          }
        });
        divContainer.appendChild(option);
      });
  }

  inputElement.addEventListener("input", (e) => {
    const searchText = e.target.value;
    displayFilteredIngredients(searchText);
  });

  displayFilteredIngredients(""); // Display all ingredients initially
  dropdown.appendChild(divContainer);
}

document.addEventListener("DOMContentLoaded", () => {
  populateIngredientsDropdown();
});

async function getAllAppareils() {
  const response = await fetch("/data/recipes.json");
  const data = await response.json();
  const appareils = new Set(); // Use a Set to store unique appareils

  data.recipes.forEach((recipe) => {
    appareils.add(recipe.appliance.toLowerCase()); // Add each appareil to the Set
  });

  return Array.from(appareils); // Convert the Set to an Array to return
}

async function filterRecipesByAppareil(appareil) {
  const data = await getRecipes(); // Retrieves all recipes
  const recipes = data.recipes;
  let filteredRecipes = recipes;
  if (appareil.length > 0) {
    filteredRecipes = recipes.filter(
      (recipe) =>
        typeof appareil === "string" &&
        recipe.appliance.toLowerCase() === appareil.toLowerCase()
    );
  }

  displayRecipes(filteredRecipes);
  filterRecipes(selectIngredients, selectAppareils, selectUstensils);
}

export async function populateAppareilsDropdown() {
  const allAppareils = await getAllAppareils();
  const dropdown = document.getElementById("tagsAp"); // Ensure this is your actual dropdown ID
  const divContainer = document.createElement("div");
  divContainer.classList.add("py-1");
  divContainer.id = "tagsApSub";
  const inputElement = document.createElement("input");
  inputElement.setAttribute("type", "text");
  inputElement.setAttribute("placeholder", "Search...");
  inputElement.classList.add(
    "w-full",
    "px-3",
    "py-2",
    "border",
    "rounded-md",
    "text-gray-900",
    "leading-tight"
  );
  divContainer.appendChild(inputElement);

  function displayFilteredAppareils(filterText) {
    const currentAppareils = divContainer.querySelectorAll("p");
    currentAppareils.forEach((p) => p.remove());

    allAppareils
      .filter((appareil) => {
        return appareil.toLowerCase().includes(filterText.toLowerCase());
      })
      .forEach((appareil) => {
        const option = document.createElement("p");
        option.classList.add(
          "text-gray-700",
          "block",
          "px-3",
          "py-2",
          "text-sm",
          "hover:bg-gray-100"
        );
        option.textContent = appareil;
        option.tabIndex = 0; // Make it focusable
        /*option.addEventListener("click", () =>
          filterRecipesByAppareil(appareil)
        );*/
        option.addEventListener("click", () => {
          console.log(`Appareil clicked: ${appareil}`);
          if (!selectAppareils.includes(appareil)) {
            selectAppareils.push(appareil);
            createAppareilTag(appareil);
            filterRecipesByAppareil(appareil).then(() => {
              console.log(`Recipes filtered by appareil: ${appareil}`);
            });
            filterRecipes(selectIngredients, selectAppareils, selectUstensils);
          }
        });
        option.addEventListener("keypress", (e) => {
          if (e.key === "Enter") {
            filterRecipesByAppareil(appareil);
          }
        });
        divContainer.appendChild(option);
      });
  }

  inputElement.addEventListener("input", (e) => {
    const searchText = e.target.value;
    displayFilteredAppareils(searchText);
  });

  displayFilteredAppareils("");

  dropdown.appendChild(divContainer);
}
document.addEventListener("DOMContentLoaded", () => {
  populateAppareilsDropdown();
});

async function getAllUstensils() {
  const response = await fetch("/data/recipes.json");
  const data = await response.json();
  const utensils = new Set(); // Use a Set to store unique utensils
  const utensilsCaseMap = {};
  data.recipes.forEach((recipe) => {
    recipe.ustensils.forEach((utensil) => {
      const lowerCaseUtensil = utensil.toLowerCase();
      if (!utensilsCaseMap[lowerCaseUtensil]) {
        utensilsCaseMap[lowerCaseUtensil] = utensil; // Store the original case
        utensils.add(lowerCaseUtensil);
      }
    });
  });
  return Array.from(utensils).map((utensil) => utensilsCaseMap[utensil]); // Convert to array and map back to original case
}
async function filterRecipesByUstensil(ustensil) {
  const data = await getRecipes(); // Retrieves all recipes
  const recipes = data.recipes;
  let filteredRecipes = recipes;
  if (ustensil.length > 0) {
    if (typeof ustensil === "string") {
      filteredRecipes = recipes.filter((recipe) =>
        recipe.ustensils.some(
          (item) => item.toLowerCase() === ustensil.toLowerCase()
        )
      );
    }
  }
  displayRecipes(filteredRecipes);
  filterRecipes(selectIngredients, selectAppareils, selectUstensils);
}
export async function populateUstensilsDropdown() {
  const allUstensils = await getAllUstensils();
  const dropdown = document.getElementById("tagsUs"); // Ensure this is your actual dropdown ID
  const divContainer = document.createElement("div");
  divContainer.classList.add("py-1");
  divContainer.id = "tagsUsSub";
  const inputElement = document.createElement("input");
  inputElement.setAttribute("type", "text");
  inputElement.setAttribute("placeholder", "Search...");
  inputElement.classList.add(
    "w-full",
    "px-3",
    "py-2",
    "border",
    "rounded-md",
    "text-gray-900",
    "leading-tight"
  );
  divContainer.appendChild(inputElement);

  // Function to filter and display utensils
  function displayFilteredUstensils(filterText) {
    // Clear current utensils
    const currentUstensils = divContainer.querySelectorAll("p");
    currentUstensils.forEach((p) => p.remove());

    // Filter utensils and append them to the divContainer
    allUstensils
      .filter((utensil) => {
        return utensil.toLowerCase().includes(filterText.toLowerCase());
      })
      .forEach((utensil) => {
        const option = document.createElement("p");
        option.classList.add(
          "text-gray-700",
          "block",
          "px-3",
          "py-2",
          "text-sm",
          "hover:bg-gray-100"
        );
        option.textContent = utensil;
        option.tabIndex = 0; // Make it focusable
        /*ption.addEventListener("click", () =>
          filterRecipesByUstensil(utensil)
        );*/
        option.addEventListener("click", () => {
          console.log(`Ustensil clicked: ${utensil}`);
          if (!selectUstensils.includes(utensil)) {
            selectUstensils.push(utensil);
            createUstensilTag(utensil);
            filterRecipesByUstensil(utensil).then(() => {
              console.log(`Recipes filtered by ustensil: ${utensil}`);
            });
            filterRecipes(selectIngredients, selectAppareils, selectUstensils);
          }
        });
        option.addEventListener("keypress", (e) => {
          if (e.key === "Enter") {
            filterRecipesByUstensil(utensil);
          }
        });
        divContainer.appendChild(option);
      });
  }

  // Event listener for the input element
  inputElement.addEventListener("input", (e) => {
    const searchText = e.target.value;
    displayFilteredUstensils(searchText);
  });

  // Initially display all utensils
  displayFilteredUstensils("");

  dropdown.appendChild(divContainer);
}

document.addEventListener("DOMContentLoaded", () => {
  populateUstensilsDropdown();
});
// Function to toggle dropdown visibility
export function toggleDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  dropdown.classList.toggle("hidden"); // "hidden" class should be defined in CSS to hide elements
}

export async function filterRecipes(ingredients, appareils, ustensils) {
  const data = await getRecipes();
  let filteredRecipes = data.recipes;

  if (ingredients.length) {
    // Apply ingredient filter
    filteredRecipes = filteredRecipes.filter((recipe) =>
      ingredients.every((ing) =>
        recipe.ingredients.some(
          (rIng) => rIng.ingredient.toLowerCase() === ing.toLowerCase()
        )
      )
    );
  }

  if (appareils.length) {
    // Apply appareils filter
    filteredRecipes = filteredRecipes.filter((recipe) =>
      appareils.includes(recipe.appliance.toLowerCase())
    );
  }

  if (ustensils.length) {
    // Apply ustensils filter
    filteredRecipes = filteredRecipes.filter((recipe) =>
      ustensils.every((ust) =>
        recipe.ustensils.some(
          (rUst) => rUst.toLowerCase() === ust.toLowerCase()
        )
      )
    );
  }

  displayRecipes(filteredRecipes);
  updateAvailableTags(filteredRecipes);
}
function updateAvailableTags(filteredRecipes) {
  const allAppareils = new Set();
  const allIngredients = new Set();
  const allUstensils = new Set();

  // Collect unique appareils, ingredients, and ustensils from filtered recipes
  filteredRecipes.forEach((recipe) => {
    allAppareils.add(recipe.appliance.toLowerCase());

    recipe.ingredients.forEach((ingredientObj) => {
      allIngredients.add(ingredientObj.ingredient.toLowerCase());
    });

    recipe.ustensils.forEach((ustensil) => {
      allUstensils.add(ustensil.toLowerCase());
    });
  });

  // Update the UI for each category of tags
  updateTagUI("Ap", allAppareils);
  updateTagUI("In", allIngredients);
  updateTagUI("Us", allUstensils);
}

function updateTagUI(category, availableTags) {
  // Get the container for the specific category of tags
  const tagsContainer = document.getElementById(
    `tags${category.charAt(0).toUpperCase() + category.slice(1)}Sub`
  );
  const existingTags = tagsContainer.querySelectorAll("p");

  // Loop through all existing tags and hide those that are not in the availableTags set
  existingTags.forEach((tagElement) => {
    const text = tagElement.textContent.trim().toLowerCase();
    if (!availableTags.has(text)) {
      tagElement.style.display = "none";
    } else {
      tagElement.style.display = "block";
    }
  });
}

// Call this function after you have filtered the recipes
