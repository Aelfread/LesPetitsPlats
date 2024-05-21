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
    divRecipeInstructions.classList.add("my-3", "w-80", "h-28", "hidden");
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
    p.classList.add("text-sm", "leading-5", "hidden", "h-20", "w-80");
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
    fetch(`http://localhost:5500/data/recipes.json/${this.id}`);
    return divRecipes;
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
