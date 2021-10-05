import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {

    recipeChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'A Test Recipe',
            'This is simply a Recipe',
            'https://i.pinimg.com/originals/bb/bc/78/bbbc7851b7b941169ed9b091628ad3e4.jpg',
            [
                new Ingredient('Meat', 10),
                new Ingredient('French Fries', 2)
            ]),
        new Recipe(
            'A Best Recipe',
            'This is hardly a Recipe',
            'https://www.indianhealthyrecipes.com/wp-content/uploads/2019/11/samosa-recipe.jpg',
            [
                new Ingredient('Burger', 10),
                new Ingredient('Buns', 2)
            ]),
    ];

    constructor(private slService: ShoppingListService) {

    }

    setRecipies(recipies: Recipe[]) {
        this.recipes = recipies;
        this.recipeChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }


}
