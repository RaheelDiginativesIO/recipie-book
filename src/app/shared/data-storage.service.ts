import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) {}

    storeRecipes() {
        const token = this.authService.getToken();
        return this.httpClient.put('https://angularfirstapp-49dd7-default-rtdb.firebaseio.com//recipies.json?auth=' + token,
        this.recipeService.getRecipes(),
        {
            observe: 'body'
        });
    }

    getRecipes() {
        const token = this.authService.getToken();
        this.httpClient.get<Recipe[]>('https://angularfirstapp-49dd7-default-rtdb.firebaseio.com/recipies.json?auth=' + token, {
            observe: 'body',
            responseType: 'json'
        })
        .pipe(
            map(
                (recipies) => {
                    for (let recipe of recipies) {
                        if (!recipe['ingredients']) {
                            recipe['ingredients'] = [];
                        }
                    }
                    return recipies;
                }
            )
        )
        .subscribe(
            (recipies: Recipe[]) => {
                this.recipeService.setRecipies(recipies);
            }
        );
    }

}
