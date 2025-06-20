const input = document.getElementById("ingredientInput");
const list = document.getElementById("ingredientList");
const btn = document.getElementById("generateBtn");
const output = document.getElementById("output");
const errorDiv = document.getElementById("error");
const illustration = document.getElementById("illustration");

const ingredients = [];

// Add ingredient on Enter key
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && input.value.trim()) {
    const val = input.value.trim();
    ingredients.push(val);
    renderList();
    input.value = "";
    errorDiv.textContent = "";
  }
});

function capitalizeFirst(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function renderList() {
  list.innerHTML = "";
  ingredients.forEach((item, index) => {
    item = capitalizeFirst(item);
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      ${item}
      <button class="btn btn-sm">✕</button>
    `;
    li.querySelector("button").addEventListener("click", () => {
      ingredients.splice(index, 1);
      renderList();
    });
    list.appendChild(li);
  });
}

// Generate recipe
btn.addEventListener("click", async () => {
  if (ingredients.length === 0) {
    errorDiv.textContent = "Please enter at least one ingredient.";
    return;
  }

  output.classList.remove("d-none");
  output.innerHTML = `<div class="text-center text-muted">🔍 Validating ingredients...</div>`;
  illustration.classList.add("d-none");
  errorDiv.textContent = "";

  try {
    const validateRes = await fetch("/api/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients }),
    });

    const validation = await validateRes.json();

    if (!validateRes.ok) {
      throw new Error(validation.error || "Ingredient validation failed.");
    }

    output.innerHTML = `<div class="text-center text-muted">🍳 Generating recipe...</div>`;

    const recipeRes = await fetch("/api/recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients }),
    });

    const recipe = await recipeRes.json();

    if (!recipeRes.ok) {
      throw new Error(recipe.error || "Recipe generation failed.");
    }

    output.innerHTML = `
    <div class="recipe-card">
      <h3 class="recipe-title">${recipe.title}</h3>
  
      <h5 class="section-heading">📝 Ingredients</h5>
      <ul class="custom-list ingredients-list">
        ${recipe.ingredients.map((i) => `<li>${i}</li>`).join("")}
      </ul>
  
      <h5 class="section-heading">👨‍🍳 Instructions</h5>
      <ol class="custom-list instructions-list">
        ${recipe.instructions.map((step) => `<li>${step}</li>`).join("")}
      </ol>
    </div>
  `;
  } catch (err) {
    output.classList.add("d-none");
    illustration.classList.remove("d-none");
    errorDiv.textContent = err.message;
  }
});
