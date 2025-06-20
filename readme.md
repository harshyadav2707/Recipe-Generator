
# AI-Powered Recipe Generator

A weekend project that helps you cook smarter with what you already have.  
Input your available ingredients, and the app will generate a complete recipe using AI.

---

## 🔍 Overview

This application takes a list of ingredients and:
1. **Validates** them using an AI-powered check.
2. **Generates a full recipe** (title, ingredients, instructions) using a large language model (LLM).

---

## 💡 Key Features

- **Ingredient Validation**: Filters out non-food items using an AI model.
- **Recipe Generation**: Uses OpenRouter (backed by OpenAI/Mistral) to generate creative, usable recipes.
- **Clean Express Backend**: Built with Node.js and Express.
- **Simple Frontend**: Static HTML/CSS for easy interaction (customizable for future UI improvements).

---

## 🛠️ Tech Stack

- **Node.js** (backend)
- **Express.js** (API server)
- **OpenRouter** (LLM API gateway)
- **Mistral AI model** (`mistralai/devstral-small:free`)
- **JavaScript**
- **Dotenv** for config management

---

## 📦 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/ai-recipe-generator.git
   cd ai-recipe-generator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Create a `.env` file in the root directory.
   - Add your OpenRouter API key:
     ```env
     OPENROUTER_API_KEY=your_openrouter_key
     ```

4. **Run the app:**
   ```bash
   node index.js
   ```
   Server will run on: `http://localhost:3000`

---

## 📋 API Endpoints

### `POST /api/validate`

**Request Body:**
```json
{
  "ingredients": ["onion", "plastic", "cheese"]
}
```

**Response:**
- If invalid items found:
```json
{
  "error": "These are not valid food items: plastic"
}
```
- If all are valid:
```json
{
  "valid": true
}
```

---

### `POST /api/recipe`

**Request Body:**
```json
{
  "ingredients": ["paneer", "tomato", "onion"]
}
```

**Response:**
```json
{
  "title": "Paneer Tomato Curry",
  "ingredients": ["paneer", "tomato", "onion", "spices"],
  "instructions": [
    "Chop the onions and tomatoes.",
    "Fry onions until golden brown, add tomatoes and spices.",
    "Add paneer and simmer until cooked."
  ]
}
```

---

## 🙌 Future Improvements

- UI enhancement with React or Vue
- Option to save/share recipes
- Voice input support
- Meal type suggestions (breakfast, lunch, dinner)

---

## 🤝 Contributions & Feedback

Open to ideas, suggestions, or PRs.  
Feel free to raise issues or drop feedback via LinkedIn or GitHub Issues.

