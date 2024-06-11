import { toggleDropdown } from "./filter.js";
import { getRecipes } from "./index.js";
export function createRecipeCard(recipe) {
  const {
    id,
    image,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils,
  } = recipe;
  const picture = `assets/images/${image}`;
  function getRecipeCard() {
    const divRecipes = document.getElementById("recipes");
    const article = document.createElement("article");
    article.classList.add("w-96", "h-46", "bg-white", "rounded-2xl");
    const divSrecipe = document.createElement("div");
    divSrecipe.classList.add("w-96", "h-46", "relative");
    const span = document.createElement("span");
    span.classList.add(
      "absolute",
      "absolute-positionx",
      "absolute-positiony",
      "text-xs",
      "leading-4",
      "p-1",
      "rounded-2xl",
      "bg-yellow-400",
      "text-black",
      "w-16",
      "text-center"
    );
    span.innerHTML = `${time} min`;
    const img = document.createElement("img");
    img.classList.add("w-full", "h-64", "object-cover", "rounded-md");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    const divRecipeContainer = document.createElement("div");
    divRecipeContainer.classList.add("m-5");
    const divRecipeInfo = document.createElement("div");
    divRecipeInfo.classList.add("my-6");
    const h2 = document.createElement("h2");
    h2.classList.add("text-lg", "anton");
    h2.innerHTML = name;
    const divRecipeContent = document.createElement("div");
    divRecipeContent.classList.add("my-3");
    const divRecipeInstructions = document.createElement("div");
    divRecipeInstructions.classList.add(
      "my-3",
      "w-80",
      "h-28",
      "overflow-hidden"
    );
    const h3R = document.createElement("h3");
    h3R.classList.add(
      "text-gray-500",
      "text-xs",
      "leading-4",
      "font-bold",
      "my-4"
    );
    h3R.innerHTML = "RECETTE";
    const p = document.createElement("p");
    p.classList.add("text-sm", "leading-5", "overflow-hidden", "h-20", "w-80");
    p.innerHTML = description;
    const divRecipeIngredients = document.createElement("div");
    divRecipeIngredients.classList.add("grid");
    const h3I = document.createElement("h3");
    h3I.classList.add(
      "text-gray-500",
      "text-xs",
      "leading-4",
      "font-bold",
      "my-4"
    );
    h3I.innerHTML = "INGREDIENTS";
    const ul = document.createElement("ul");
    ul.classList.add("h-48", "grid", "grid-cols-2", "gap-x-16");
    const li = document.createElement("li");
    const li1 = document.createElement("li");
    const li2 = document.createElement("li");
    const li3 = document.createElement("li");
    const li4 = document.createElement("li");
    const li5 = document.createElement("li");
    li.classList.add("text-sm", "font-medium");
    li.innerHTML = `${ingredients[0].ingredient}  <br /> ${
      ingredients[0].unit
        ? `<span class="text-gray-500"> ${ingredients[0].quantity} ${ingredients[0].unit}</span>`
        : `<span class="text-gray-500"> ${ingredients[0].quantity}</span>`
    }`;
    console.log(ingredients[0].ingredient);
    li1.classList.add("text-sm", "font-medium");
    li1.innerHTML = `${ingredients[1].ingredient} <br /> ${
      ingredients[1].unit
        ? `<span class="text-gray-500"> ${ingredients[1].quantity} ${ingredients[1].unit}</span>`
        : `<span class="text-gray-500"> ${ingredients[1].quantity}</span>`
    }`;
    console.log(ingredients[1].ingredient);
    li2.classList.add("text-sm", "font-medium");
    li2.innerHTML = `${ingredients[2].ingredient} <br /> ${
      ingredients[2].unit
        ? `<span class="text-gray-500"> ${ingredients[2].quantity} ${ingredients[2].unit}</span>`
        : `<span class="text-gray-500"> ${ingredients[2].quantity}</span>`
    }`;
    // Check if the ingredients array has elements at indices 3, 4, and 5 before accessing their properties
    if (ingredients.length > 3) {
      li3.classList.add("text-sm", "font-medium");
      li3.innerHTML = `${
        ingredients[3].ingredient || ""
      } <br /> <span class="text-gray-500"> ${ingredients[3].quantity || ""} ${
        ingredients[3].unit || ""
      }</span>`;
    }

    if (ingredients.length > 4) {
      li4.classList.add("text-sm", "font-medium");
      li4.innerHTML = `${
        ingredients[4].ingredient || ""
      } <br /> <span class="text-gray-500"> ${ingredients[4].quantity || ""} ${
        ingredients[4].unit || ""
      }</span>`;
    }

    if (ingredients.length > 5) {
      li5.classList.add("text-sm", "font-medium");
      li5.innerHTML = `${
        ingredients[5].ingredient || ""
      } <br /> <span class="text-gray-500"> ${ingredients[5].quantity || ""} ${
        ingredients[5].unit || ""
      }</span>`;
    }

    ul.appendChild(li);
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);
    ul.appendChild(li5);
    divRecipeContainer.appendChild(divRecipeInfo);
    divRecipeContainer.appendChild(divRecipeContent);
    divRecipeContent.appendChild(divRecipeInstructions);
    divRecipeInstructions.appendChild(h3R);
    divRecipeInstructions.appendChild(p);
    divRecipeContent.appendChild(divRecipeIngredients);
    divRecipeIngredients.appendChild(h3I);
    divRecipeIngredients.appendChild(ul);
    /*divRecipeInfo.appendChild(span);
    divRecipeInfo.appendChild(img);*/
    divRecipeInfo.appendChild(h2);
    divSrecipe.appendChild(span);
    divSrecipe.appendChild(img);
    divSrecipe.appendChild(divRecipeContainer);
    article.appendChild(divSrecipe);
    divRecipes.appendChild(article);

    //divRecipes.appendChild(article);
    //fetch(`http://localhost:5500/data/recipes.json/${this.id}`);
    return article;
  }
  return {
    id,
    image,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils,
    getRecipeCard,
  };
}

export function createFilters() {
  const filters = document.getElementById("filters");
  const divFiltersIngredients = document.createElement("div");
  divFiltersIngredients.classList.add("relative", "inline-block", "text-left");
  const divFiltersIngredientsSub = document.createElement("div");
  divFiltersIngredientsSub.setAttribute("id", "ingredients");
  const btnFiltersIngredientsSub = document.createElement("button");
  btnFiltersIngredientsSub.id = "btnIngredients";
  btnFiltersIngredientsSub.addEventListener("click", () => {
    toggleDropdown("tagsIn");
  });
  btnFiltersIngredientsSub.classList.add(
    "inline-flex",
    "justify-center",
    "w-full",
    "gap-x-8",
    "rounded-md",
    "bg-white",
    "pl-3",
    "pr-16",
    "py-3",
    "text-sm",
    "font-semibold",
    "text-gray-900",
    "shadow-sm",
    "ring-1",
    "ring-inset",
    "ring-gray-300",
    "hover:bg-gray-50"
  );
  btnFiltersIngredientsSub.textContent = "Ingredients";
  const svgFiltersIngredientsSub = document.createElement("svg");
  svgFiltersIngredientsSub.classList.add(
    "-mr-1",
    "h-5",
    "w-5",
    "text-gray-400"
  );
  svgFiltersIngredientsSub.setAttribute("viewBox", "0 0 20 20");
  svgFiltersIngredientsSub.setAttribute("fill", "currentColor");
  svgFiltersIngredientsSub.setAttribute("aria-hidden", "true");
  const pathFiltersIngredientsSub = document.createElement("path");
  pathFiltersIngredientsSub.setAttribute("fill-rule", "evenodd");
  pathFiltersIngredientsSub.setAttribute(
    "d",
    "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
  );
  pathFiltersIngredientsSub.setAttribute("clip-rule", "evenodd");
  const divTagsIn = document.createElement("div");
  divTagsIn.setAttribute("id", "tagsIn");
  divTagsIn.classList.add(
    "absolute",
    "hidden",
    "z-10",
    "left-0",
    "mt-0",
    "w-full",
    "h-80",
    "overflow-y-scroll",
    "origin-top-right",
    "rounded-md",
    "bg-white",
    "shadow-lg",
    "ring-1",
    "ring-black",
    "ring-opacity-5",
    "focus:outline-none"
  );
  //divTagsIn.style.zIndex = "10";
  svgFiltersIngredientsSub.appendChild(pathFiltersIngredientsSub);
  btnFiltersIngredientsSub.appendChild(svgFiltersIngredientsSub);
  divFiltersIngredientsSub.appendChild(btnFiltersIngredientsSub);
  divFiltersIngredients.appendChild(divFiltersIngredientsSub);
  divFiltersIngredientsSub.appendChild(divTagsIn);
  const divFiltersAppareils = document.createElement("div");
  divFiltersAppareils.classList.add("relative", "inline-block", "text-left");
  const divFiltersAppareilsSub = document.createElement("div");
  divFiltersAppareilsSub.setAttribute("id", "appareils");
  const btnFiltersAppareilsSub = document.createElement("button");
  btnFiltersAppareilsSub.id = "btnAppareils";
  btnFiltersAppareilsSub.addEventListener("click", () => {
    toggleDropdown("tagsAp");
  });
  btnFiltersAppareilsSub.classList.add(
    "inline-flex",
    "justify-center",
    "w-full",
    "gap-x-8",
    "rounded-md",
    "bg-white",
    "pl-3",
    "pr-16",
    "py-3",
    "text-sm",
    "font-semibold",
    "text-gray-900",
    "shadow-sm",
    "ring-1",
    "ring-inset",
    "ring-gray-300",
    "hover:bg-gray-50"
  );
  btnFiltersAppareilsSub.textContent = "Appareils";
  const svgFiltersAppareilsSub = document.createElement("svg");
  svgFiltersAppareilsSub.classList.add("-mr-1", "h-5", "w-5", "text-gray-400");
  svgFiltersAppareilsSub.setAttribute("viewBox", "0 0 20 20");
  svgFiltersAppareilsSub.setAttribute("fill", "currentColor");
  svgFiltersAppareilsSub.setAttribute("aria-hidden", "true");
  const pathFiltersAppareilsSub = document.createElement("path");
  pathFiltersAppareilsSub.setAttribute("fill-rule", "evenodd");
  pathFiltersAppareilsSub.setAttribute(
    "d",
    "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
  );
  pathFiltersAppareilsSub.setAttribute("clip-rule", "evenodd");
  const divTagsAp = document.createElement("div");
  divTagsAp.setAttribute("id", "tagsAp");
  divTagsAp.classList.add(
    "absolute",
    "hidden",
    "z-10",
    "left-0",
    "mt-0",
    "w-full",
    "h-80",
    "overflow-y-scroll",
    "origin-top-right",
    "rounded-md",
    "bg-white",
    "shadow-lg",
    "ring-1",
    "ring-black",
    "ring-opacity-5",
    "focus:outline-none"
  );
  svgFiltersAppareilsSub.appendChild(pathFiltersAppareilsSub);
  btnFiltersAppareilsSub.appendChild(svgFiltersAppareilsSub);
  divFiltersAppareilsSub.appendChild(btnFiltersAppareilsSub);
  divFiltersAppareils.appendChild(divFiltersAppareilsSub);
  divFiltersAppareilsSub.appendChild(divTagsAp);
  const divFiltersUstensiles = document.createElement("div");
  divFiltersUstensiles.classList.add("relative", "inline-block", "text-left");

  const divFiltersUstensilesSub = document.createElement("div");
  divFiltersUstensilesSub.setAttribute("id", "ustensils");
  const btnFiltersUstensilesSub = document.createElement("button");
  btnFiltersUstensilesSub.setAttribute("id", "btnUstensils");
  btnFiltersUstensilesSub.addEventListener("click", () => {
    toggleDropdown("tagsUs");
  });
  btnFiltersUstensilesSub.classList.add(
    "inline-flex",
    "justify-center",
    "w-full",
    "gap-x-8",
    "rounded-md",
    "bg-white",
    "pl-3",
    "pr-16",
    "py-3",
    "text-sm",
    "font-semibold",
    "text-gray-900",
    "shadow-sm",
    "ring-1",
    "ring-inset",
    "ring-gray-300",
    "hover:bg-gray-50"
  );
  btnFiltersUstensilesSub.textContent = "Ustensiles";

  const svgFiltersUstensilesSub = document.createElement("svg");
  svgFiltersUstensilesSub.classList.add("-mr-1", "h-5", "w-5", "text-gray-400");
  svgFiltersUstensilesSub.setAttribute("viewBox", "0 0 20 20");
  svgFiltersUstensilesSub.setAttribute("fill", "currentColor");
  svgFiltersUstensilesSub.setAttribute("aria-hidden", "true");
  const pathFiltersUstensilesSub = document.createElement("path");
  pathFiltersUstensilesSub.setAttribute("fill-rule", "evenodd");
  pathFiltersUstensilesSub.setAttribute(
    "d",
    "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
  );
  pathFiltersUstensilesSub.setAttribute("clip-rule", "evenodd");
  const divTagsUs = document.createElement("div");
  divTagsUs.setAttribute("id", "tagsUs");
  divTagsUs.classList.add(
    "absolute",
    "hidden",
    "z-10",
    "left-0",
    "mt-0",
    "w-full",
    "h-80",
    "overflow-y-scroll",
    "origin-top-right",
    "rounded-md",
    "bg-white",
    "shadow-lg",
    "ring-1",
    "ring-black",
    "ring-opacity-5",
    "focus:outline-none"
  );
  const divNumberRecipes = document.createElement("div");
  divNumberRecipes.classList.add(
    "flex",
    "flex-end",
    "w-1/2",
    "justify-end",
    "items-center"
  );

  const h3NumberRecipes = document.createElement("h3");
  h3NumberRecipes.id = "recipe-count"; // Assign an ID for easy reference
  h3NumberRecipes.classList.add("font-bold", "text-2xl", "leading-8", "anton");
  //h3NumberRecipes.textContent = `50 recettes`;
  divNumberRecipes.appendChild(h3NumberRecipes);
  svgFiltersUstensilesSub.appendChild(pathFiltersUstensilesSub);
  btnFiltersUstensilesSub.appendChild(svgFiltersUstensilesSub);
  divFiltersUstensilesSub.appendChild(btnFiltersUstensilesSub);
  divFiltersUstensiles.appendChild(divFiltersUstensilesSub);
  divFiltersUstensilesSub.appendChild(divTagsUs);
  filters.appendChild(divFiltersIngredients);
  filters.appendChild(divFiltersAppareils);
  filters.appendChild(divFiltersUstensiles);
  filters.appendChild(divNumberRecipes);
  return filters;
}
export function updateRecipeCount(count) {
  const h3NumberRecipes = document.getElementById("recipe-count");
  if (h3NumberRecipes) {
    h3NumberRecipes.textContent = `${count} recettes`;
  }
}
document.addEventListener("DOMContentLoaded", async () => {
  const recipesData = await getRecipes();
  updateRecipeCount(recipesData.recipes.length);
});
