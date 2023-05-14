import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { authService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class dataStorageService {
  constructor(private http: HttpClient, private recipiSF: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipiSF.getRecipe();
    this.http
      .put(
        'https://shopping-cart-db-132b2-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  fetchRecipe() {
    console.log('3 fetchrecipeLogin function called');
    return this.http
      .get<Recipe[]>(
        'https://shopping-cart-db-132b2-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipiSF.fetchRecipe(recipes);
        })
      );
  }
}
