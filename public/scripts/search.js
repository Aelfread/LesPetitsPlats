import { displayRecipes } from "./filter.js";
import { getRecipes } from "./index.js";
// Assuming you have a search input with id="search"
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("search-button"); // Add the button's ID here
const suggestionsContainer = document.createElement("div");
const divSearchbar = document.getElementById("search-form");
suggestionsContainer.classList.add(
  "autocomplete-suggestions",
  "absolute",
  "top-search",
  "right-search",
  "bg-white",
  "w-search",
  "rounded",
  "z-10",
  "p-1",
  "shadow-sm"
);
divSearchbar.appendChild(suggestionsContainer);
let searchTags = [];
// Function to create and display the tag
function createTag(text) {
  const tagContainer = document.getElementById("tagsSearch"); // The container where tags will be displayed
  const tag = document.createElement("span");
  tag.classList.add("search-tag", "text-white");
  tag.textContent = text;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "x";
  removeBtn.onclick = function () {
    tag.remove(); // Remove the tag when the 'x' button is clicked
    removeSearchTag(text);
  };

  tag.appendChild(removeBtn);
  tagContainer.appendChild(tag);

  addSearchTag(text);
}
function addSearchTag(tag) {
  if (!searchTags.includes(tag)) {
    searchTags.push(tag);
    performSearch();
  }
}

function removeSearchTag(tag) {
  const index = searchTags.indexOf(tag);
  if (index > -1) {
    searchTags.splice(index, 1);
    performSearch();
  }
}

// Assuming you have a function getRecipes that fetches your data
async function getSuggestions(inputText) {
  const data = await getRecipes(); // Replace with your data fetching logic
  const lowerCaseInputText = inputText.toLowerCase();

  // Combine recipe names, ingredients, appareils, and ustensils into one array
  let suggestions = [];

  data.recipes.forEach((recipe) => {
    if (recipe.name.toLowerCase().includes(lowerCaseInputText)) {
      suggestions.push(recipe.name);
    }

    // Assuming each ingredient is an object with a property named 'ingredient'
    recipe.ingredients.forEach((item) => {
      const ingredientName = item.ingredient; // Access the 'ingredient' property
      if (ingredientName.toLowerCase().includes(lowerCaseInputText)) {
        suggestions.push(ingredientName); // Add the ingredient name to suggestions
      }
    });
  });

  // Remove duplicates from the suggestions array
  suggestions = [...new Set(suggestions)];

  return suggestions;
}

// Function to update the autocomplete suggestions
async function updateAutocompleteSuggestions(inputText) {
  // Clear previous suggestions
  suggestionsContainer.innerHTML = "";

  if (!inputText.trim()) {
    return;
  }
  if (inputText.length >= 3) {
    // Get suggestions based on inputText
    const suggestions = await getSuggestions(inputText);

    // Create and append the suggestions to the suggestionsContainer
    suggestions.forEach((suggestion) => {
      const suggestionElement = document.createElement("div");
      suggestionElement.textContent = suggestion;
      suggestionElement.classList.add("suggestion");
      suggestionElement.addEventListener("click", (event) => {
        if (event.target.classList.contains("suggestion")) {
          const suggestionText = event.target.textContent;
          createTag(suggestionText);
          searchInput.value = suggestion;
          suggestionsContainer.innerHTML = ""; // Clear suggestions after selection
          performSearch(); // Call the search function or any other action
        }
      });
      suggestionsContainer.appendChild(suggestionElement);
    });
  }
}

// Function to filter recipes based on the search query
// Function to filter recipes based on an array of tags
function filterRecipes(tags) {
  getRecipes().then((data) => {
    let filteredRecipes = data.recipes;

    // Filter for each tag
    tags.forEach((tag) => {
      const lowerCaseTag = tag.toLowerCase();

      // Filter recipes that match the tag in the title, ingredients, or description
      filteredRecipes = filteredRecipes.filter((recipe) => {
        const titleMatch = recipe.name.toLowerCase().includes(lowerCaseTag);
        const ingredientMatch = recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(lowerCaseTag)
        );
        const descriptionMatch = recipe.description
          .toLowerCase()
          .includes(lowerCaseTag);

        return titleMatch || ingredientMatch || descriptionMatch;
      });
    });

    // Call the function to update the UI with the filtered recipes
    displayRecipes(filteredRecipes);
  });
}

function performSearch() {
  if (searchTags.length === 0) {
    // Fetch and display all recipes if there are no tags.
    getRecipes().then((data) => {
      displayRecipes(data.recipes);
    });
  } else {
    // Pass the `searchTags` array to the filter function if there are tags.
    filterRecipes(searchTags);
  }
}
// Event listener for the search button click
searchButton.addEventListener("click", () => {
  performSearch();
});
searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const inputText = searchInput.value.trim();
    if (inputText) {
      createTag(inputText);
      searchInput.value = "";
      suggestionsContainer.innerHTML = "";
      performSearch();
    }
  }
});
// Function to handle search input and initiate search
function handleSearchInput(event) {
  const query = event.target.value.trim(); // Get the current value and trim whitespace
  if (query.length >= 3) {
    // Only perform search if query is 3 or more characters
    performSearch();
  }
}
// Event listener for the input field
// Event listeners for the search input
searchInput.addEventListener("input", (event) => {
  handleSearchInput(event);
  updateAutocompleteSuggestions(event.target.value);
});
//jsbench => https://jsben.ch/t1WW5
