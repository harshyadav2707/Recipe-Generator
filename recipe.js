const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function getRecipeJSON(ingredients) {
  const prompt = `You are a recipe generator. Create a recipe using these ingredients: ${ingredients.join(
    ", "
  )}.
Respond only with a valid JSON object in the following format:
{
  "title": "Recipe Title",
  "ingredients": ["list", "of", "ingredients"],
  "instructions": ["Step 1", "Step 2"]
}`;

    return {
      title: "Quick Mixed Stir Fry",
      ingredients: [
        ...ingredients,
        "2 tbsp olive oil",
        "Salt to taste",
        "1 tsp soy sauce",
      ],
      instructions: [
        "Heat oil in a pan over medium heat.",
        "Add all ingredients and stir-fry for 5-7 minutes.",
        "Season with salt and soy sauce. Serve hot.",
      ],
    };
  const response = await openai.chat.completions.create({
    model: "mistralai/devstral-small:free",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  return JSON.parse(response.choices[0].message.content);
}

// ✅ Validate ingredients using Gemini
async function validateIngredientsWithAI(ingredients) {
  const prompt = `You are a food validation API. Given the following list of items:
[${ingredients.map((i) => `"${i}"`).join(", ")}]

Return ONLY a valid JSON array of any items that are **not** real or common food ingredients. Example:
["plastic", "glue"]

If all are valid food items, return an empty array: []`;
  return [];
  const response = await openai.chat.completions.create({
    model: "mistralai/devstral-small:free",
    messages: [{ role: "user", content: prompt }],
    temperature: 0,
  });

  return JSON.parse(response.choices[0].message.content);
}

module.exports = { getRecipeJSON, validateIngredientsWithAI };
