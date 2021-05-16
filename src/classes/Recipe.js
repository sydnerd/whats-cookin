class Recipe {
  constructor(thisRecipe) {
    this.id = thisRecipe.id;
    this.image = thisRecipe.image;
    this.ingredients = thisRecipe.ingredients;
    this.instructions = thisRecipe.instructions;
    this.name = thisRecipe.name;
    this.tags = thisRecipe.tags;
    this.necessaryIngredientIDs = [];
    this.necessaryIngredients = [];
  }
  findIngredientNames(ingredients) {
    this.ingredients.forEach(element => this.necessaryIngredientIDs.push(element.id));
    this.necessaryIngredients = ingredients.reduce((acc, item) => {
      if(this.necessaryIngredientIDs.includes(item.id)){
        acc.push(item.name)
      }
      return acc;
    }, []);
  }
  calculateCostOfIngredients(ingredients) {
    const totalCost = ingredients.reduce((acc, ingredient) => {
      let foundIngredient = this.ingredients.find(currentIngredient => currentIngredient.id === ingredient.id)
      acc += foundIngredient.quantity.amount * ingredient.estimatedCostInCents
      return acc
    }, 0)
    return totalCost
  }
  returnDirections() {
    const directions = this.instructions.map(item => `${item.number}: ${item.instruction}`);
    return directions.join(' ')
  }
}

export default Recipe;