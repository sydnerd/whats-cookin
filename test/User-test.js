import { expect } from 'chai';
import User from '../src/classes/User';
import Recipe from '../src/classes/Recipe';

describe('User', () => {
  let aUser, recipe1, recipe2
  beforeEach(() => {
    aUser = new User();
    recipe1 = new Recipe({
      "id": 123456,
      "image": "https://cafedelites.com/wp-content/uploads/2018/04/Best-Chicken-Tikka-Masala-IMAGE-1.jpg",
      "ingredients": [
        {
          "id": 9079,
          "quantity": {
            "amount": 1.5,
            "unit": "c"
          }
        },
        {
          "id": 11935,
          "quantity": {
            "amount": 0.5,
            "unit": "tsp"
          }
        },
      ],
      "instructions": [
        {
          "instruction": "In a large bowl, combine yogurt, lemon juice, 2 teaspoons cumin, cinnamon, cayenne, black pepper, ginger, and salt. Stir in chicken, cover, and refrigerate for 1 hour.",
          "number": 1
        },
        {
          "instruction": "Preheat a grill for high heat.",
          "number": 2
        },
      ],
      "name": "Chicken Tikka Masala",
      "tags": [
        "indian",
        "chicken",
      ]
    })
    recipe2 = new Recipe({
      "id": 987654,
      "image": "https://cdn.sallysbakingaddiction.com/wp-content/uploads/2018/10/moist-banana-bread.jpg",
      "ingredients": [
        {
          "id": 12151,
          "quantity": {
            "amount": 1,
            "unit": "c"
          }
        },
        {
          "id": 11821,
          "quantity": {
            "amount": 2,
            "unit": "tsp"
          }
        },
      ],
      "instructions": [
        {
          "instruction": "Preheat oven to 350 degrees F (175 degrees C). Lightly grease a 9x5 inch loaf pan.",
          "number": 1
        },
        {
          "instruction": "In a large bowl, combine flour, baking soda and salt. In a separate bowl, cream together butter and brown sugar. Stir in eggs and mashed bananas until well blended. Stir banana mixture into flour mixture; stir just to moisten. Pour batter into prepared loaf pan.",
          "number": 2
        },
      ],
      "name": "Banana Banana Bread",
      "tags": [
        "dessert",
        "breakfast",
      ]
    })
  })

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('Should allow a user to favorite or unfavorite recipes', () => {
    expect(aUser.favoriteRecipes).to.deep.equal([]);
    
    aUser.determineFavorite(recipe1)
    expect(aUser.favoriteRecipes).to.deep.equal([recipe1]);
    
    aUser.determineFavorite(recipe1)
    expect(aUser.favoriteRecipes).to.deep.equal([]);
  });

  // it('Should decide to cook a recipe that week (add to my recipesToCook)', () => {

  // });

  // it('Should filter my favoriteRecipes by one or more tags', () => {

  // });

  // it('Should filter my favoriteRecipes by its name or ingredients', () => {

  // });

})