# Mesob House 
A beautiful website for Mesob House — an Ethiopian restaurant that serves authentic traditional dishes like Doro Wat, Kitfo, Tibs, and more.
This project is built with modern web tools and is designed to be easy to understand, even if you're just starting out.

## What can visitors do?

- Browse the full menu with search and category filters
- View details of each dish (ingredients, spice level, price)
- Add dishes to a shopping cart
- Go through a checkout form with delivery address
- Sign in or create an account
- See special dishes highlighted on the home page

## Tool
What it does
- React :- Builds the user interface
- Vite :- Fast development server and build tool
- React Router :-Handles page navigation
- Tailwind CSS:-Styles the website quickly
- Zustand:-Manages the shopping cart
- Zod:-Validates form inputs (name, phone, etc.)
## How the Cart Works
The shopping cart uses Zustand.
All cart data is stored in src/store/cartStore.js.

You can:-Add items
        -Change quantities
        -Remove items
        -See the total price

## Form Validation
I use Zod for validation.
All rules are in src/schemas/authSchemas.js.

Examples:-Phone number must be a valid Ethiopian number
         -Password must be at least 8 characters
         -Address must be at least 2 characters
         -Full name is required
         -If the user enters invalid data, a clear error message appears under the field.

## Adding or Editing Dishes
All dishes live in:
src/data/menu.json
Each dish looks like this:

{
  "id": "menu-1",
  "slug": "doro-wat",
  "nameEn": "Classic Doro Wat",
  "nameAm": "የዶሮ ወጥ",
  "category": "Traditional Stews & Wat",
  "priceETB": 650,
  "spiceLevel": "Fiery Berbere (3/3)",
  "isFasting": false,
  "isSpecial": true,
  "description": "...",
  "ingredients": ["Free-range chicken", "Berbere", "..."],
  "servings": "Serves 1-2 generously"
}

To give a dish its own image, just add an image field:
"image": "/dishes/doro-wat.jpg"








