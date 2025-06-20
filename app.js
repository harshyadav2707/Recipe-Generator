"use strict";

const express = require("express");
const path = require("path");
require("dotenv").config();
const { getRecipeJSON, validateIngredientsWithAI } = require("./recipe");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/validate", async (req, res) => {
  try {
    const { ingredients } = req.body;
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ error: "Ingredient list is empty." });
    }

    const invalid = await validateIngredientsWithAI(ingredients);

    if (!Array.isArray(invalid)) {
      return res.status(500).json({ error: "Validation response format error." });
    }

    if (invalid.length > 0) {
      return res.status(400).json({
        error: `These are not valid food items: ${invalid.join(", ")}`,
      });
    }

    res.json({ valid: true });
  } catch (err) {
    console.error("Validation error:", err);
    res.status(500).json({ error: "Failed to validate ingredients." });
  }
});

app.post("/api/recipe", async (req, res) => {
  try {
    const { ingredients } = req.body;
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ error: "Invalid ingredients list." });
    }

    const recipe = await getRecipeJSON(ingredients);
    res.json(recipe);
  } catch (err) {
    console.error("API Error:", err);
    res.status(500).json({ error: "Failed to generate recipe. Try again." });
  }
});
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

app.listen(3000, () => console.log("🌐 Server running at http://localhost:3000"));