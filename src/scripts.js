import './styles.css';
import { getIngredientsData, getRecipesData, getUsersData } from './apiCalls';
import Recipe from '../src/classes/Recipe';
import Cookbook from '../src/classes/Cookbook';
import GroceryStore from '../src/classes/GroceryStore'
import User from '../src/classes/User';

// global variables
let ingredientsss = [];
let recipesss = [];
let usersss = [];
let cookbook, groceryStore;
const user = new User();

// query selectors
const recipeCardsSection = document.getElementById('recipeCards');
const allRecipesSection = document.getElementById('allRecipesSection');
const recipeDetailContainer = document.getElementById('recipeDetailContainer');
const recipeDetailSection = document.getElementById('recipeDetailSection');
const filterNameInput = document.getElementById('filterNameInput');
const filterNameButton = document.getElementById('filterNameButton');
const filterIngInput = document.getElementById('filterIngInput');
const filterIngButton = document.getElementById('filterIngButton');
const checkboxes = document.getElementsByName('tagBox');
const tagSubmitButton = document.getElementById('tagSubmit');
const favCheckboxes = document.getElementsByName('favTagBox');
const favTagSubmitButton = document.getElementById('favTagSubmit');
const filterSearchSection = document.getElementById('filterSearchSection');
const filterFavoriteSection = document.getElementById('filterFavoriteSection');
const favoriteButton = document.getElementById('favoriteButton');
const title = document.getElementById('title');
const filterFavNameInput = document.getElementById('filterFavNameInput');
const filterFavNameButton = document.getElementById('filterFavNameButton');
const filterFavIngInput = document.getElementById('filterFavIngInput');
const filterFavIngButton = document.getElementById('filterFavIngButton');
const cookButton = document.getElementById('cookButton')

// event listeners
filterNameButton.addEventListener('click', showRecipesByName);
filterIngButton.addEventListener('click', showRecipesByIng);
tagSubmitButton.addEventListener('click', showRecipesByTags);
favTagSubmitButton.addEventListener('click', showFavRecipesByTags);
favoriteButton.addEventListener('click', showFavoritedRecipes);
title.addEventListener('click', showAllRecipes);
filterFavNameButton.addEventListener('click', showFavRecipesByName);
filterFavIngButton.addEventListener('click', showFavRecipesByIng);
cookButton.addEventListener('click', showToCookRecipes);

// load page
window.onload = onStartup();

function getData() {
  return Promise.all([getIngredientsData(), getRecipesData(), getUsersData()]);
}

function onStartup() {
  getData()
    .then(([ingredientsData, recipeData, usersData]) => {
      ingredientsData.ingredientsData.forEach(ingredient => {
        ingredientsss.push(ingredient);
      });
      recipeData.recipeData.forEach(recipe => {
        recipesss.push(recipe);
      });
      usersData.usersData.forEach(user => {
        usersss.push(user);
      });
      cookbook = new Cookbook(recipesss);
      groceryStore = new GroceryStore(ingredientsss);
      updateRecipeCardSection(cookbook.cookbook);
    });
};

function updateRecipeCardSection(recipes) {
  recipeCardsSection.innerHTML = '';
  recipes.forEach(recipe => {
    recipeCardsSection.innerHTML +=
    `<section class="recipe-card" id="${recipe.id}">
    <div class="image-section" id="${recipe.id}">
    <img class="recipe-image hover" id="imageSection" src="${recipe.image}">
    <h2 class="recipe-name" id="imageSection">${recipe.name}</h2>
    </div>
    <div class="icon-section">
    <svg class="icon hover" id="selectFavorite" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="#000000">
      <g><path d="M0,0h24v24H0V0z" fill="none"/><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z"/>
      </g></svg>
    <svg class="icon hover" id="selectToCook" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="#000000">
      <g><rect fill="none"/></g><g><g>
      <path d="M17,22c1.66,0,3-1.34,3-3s-1.34-3-3-3c-1.3,0-2.4,0.84-2.82,2H9.14l1.99-3.06C11.42,14.98,11.71,15,12,15 s0.58-0.02,0.87-0.06l1.02,1.57c0.42-0.53,0.96-0.95,1.6-1.21l-0.6-0.93C17.31,13.27,19,10.84,19,8H5c0,2.84,1.69,5.27,4.12,6.37 l-3.95,6.08c-0.3,0.46-0.17,1.08,0.29,1.38h0c0.46,0.3,1.08,0.17,1.38-0.29l1-1.55h6.34C14.6,21.16,15.7,22,17,22z M17,18 c0.55,0,1,0.45,1,1c0,0.55-0.45,1-1,1s-1-0.45-1-1C16,18.45,16.45,18,17,18z M7.42,10h9.16c-0.77,1.76-2.54,3-4.58,3 S8.19,11.76,7.42,10z"/>
      <path d="M9.41,7h1c0.15-1.15,0.23-1.64-0.89-2.96C9.1,3.54,8.84,3.27,9.06,2H8.07C7.86,3.11,8.1,4.05,8.96,4.96 C9.18,5.2,9.75,5.63,9.41,7z"/>
      <path d="M11.89,7h1c0.15-1.15,0.23-1.64-0.89-2.96c-0.42-0.5-0.68-0.78-0.46-2.04h-0.99c-0.21,1.11,0.03,2.05,0.89,2.96 C11.67,5.2,12.24,5.63,11.89,7z"/>
      <path d="M14.41,7h1c0.15-1.15,0.23-1.64-0.89-2.96C14.1,3.54,13.84,3.27,14.06,2h-0.99c-0.21,1.11,0.03,2.05,0.89,2.96 C14.18,5.2,14.75,5.63,14.41,7z"/>
      </g></g></svg>
    </div>
    </section>`
  });
};

// functions
recipeCardsSection.addEventListener('click', function(event) {
  if (event.target.id === 'imageSection') {
    showRecipeDetails(event.target.parentElement.id);
  };
  if (event.target.id === 'selectFavorite') {
    let matchingRecipe = cookbook.cookbook.find(recipe =>
      recipe.id === parseInt(event.target.parentElement.parentElement.id));
    user.determineFavorite(matchingRecipe);
  };
  if (event.target.id === 'selectToCook') {
    let matchingRecipe = cookbook.cookbook.find(recipe =>
      recipe.id === parseInt(event.target.parentElement.parentElement.id));
    user.addToMealList(matchingRecipe);
  };
});

function showRecipeDetails(idNumber) {
  hide(filterSearchSection);
  hide(filterFavoriteSection);
  hide(allRecipesSection);
  show(recipeDetailContainer);
  const matchingRecipe = cookbook.cookbook.find(recipe => recipe.id === parseInt(idNumber));
  const instanceOfRecipe = new Recipe(matchingRecipe);
  instanceOfRecipe.findIngredientNames(ingredientsss);
  recipeDetailSection.innerHTML +=
  `<img src="${instanceOfRecipe.image}">
  <h3>${instanceOfRecipe.name}</h3>
  <h4>Ingredients</h4>
  <p>${instanceOfRecipe.necessaryIngredients.join(', ')}</p>
  <h4>Directions</h4>
  <p>${instanceOfRecipe.returnDirections().join('</p><p>')}</p>
  <h3>Cost</h3>
  <p>$${instanceOfRecipe.calculateCostOfIngredients(ingredientsss).toFixed(2)}</p>`
};

function showRecipesByName() {
  let filteredRecipe = cookbook.filterByName(filterNameInput.value);
  showRecipeDetails(filteredRecipe[0].id);
  filterNameInput.value = '';
};

function showRecipesByIng() {
  updateRecipeCardSection(cookbook.filterByIngredient(filterIngInput.value, groceryStore));
  filterIngInput.value = '';
};

function showRecipesByTags() {
  let checkedTags = [];
  checkboxes.forEach(box => {
    if (box.checked) {
      checkedTags.push(box.value);
    };
  });
  updateRecipeCardSection(cookbook.filterByTag(checkedTags))
};

function showFavoritedRecipes() {
  hide(filterSearchSection);
  hide(recipeDetailContainer);
  hide(recipeDetailSection);
  recipeDetailSection.innerHTML = '';
  show(filterFavoriteSection);
  show(allRecipesSection);
  updateRecipeCardSection(user.favoriteRecipes);
};

function showAllRecipes() {
  hide(filterFavoriteSection);
  hide(recipeDetailContainer);
  hide(recipeDetailSection);
  recipeDetailSection.innerHTML = '';
  show(filterSearchSection);
  show(allRecipesSection);
  updateRecipeCardSection(cookbook.cookbook);
};

function showFavRecipesByName() {
  let filteredRecipe = user.filterFavByName(filterFavNameInput.value);
  showRecipeDetails(filteredRecipe[0].id);
  filterFavNameInput.value = '';
};

function showFavRecipesByIng() {
  updateRecipeCardSection(user.filterFavByIngredient(filterFavIngInput.value, groceryStore));
  filterFavIngInput.value = '';
};

function showFavRecipesByTags() {
  let checkedTags = [];
  favCheckboxes.forEach(box => {
    if (box.checked) {
      checkedTags.push(box.value);
    };
  });
  updateRecipeCardSection(user.filterFavByTag(checkedTags));
};

function showToCookRecipes() {
  hide(filterSearchSection);
  hide(recipeDetailContainer);
  hide(recipeDetailSection);
  hide(filterFavoriteSection);
  recipeDetailSection.innerHTML = '';
  show(allRecipesSection);
  updateRecipeCardSection(user.recipesToCook);
};

// helper functions
function hide(e) {
  e.classList.add('hidden');
};

function show(e) {
  e.classList.remove('hidden');
};