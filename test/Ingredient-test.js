import { expect } from 'chai';
import Ingredient from '../src/classes/Ingredient';

describe('Ingredient', () => {
  let ingredient1, ingredient2, ingredient3, ingredient4, ingredient5
  beforeEach(() => {
    ingredient1 = new Ingredient(9079, 'dried cranberries', 921);
    ingredient2 = new Ingredient(11935, 'catsup', 666);
    ingredient3 = new Ingredient(12151, 'pistachio', 813);
    ingredient4 = new Ingredient(11821, 'red sweet peppers', 1027);
    ingredient5 = new Ingredient(6615, 'vegetable stock', 613);
  })

  it('should be a function', () => {
    expect(Ingredient).to.be.a('function');
  })


})