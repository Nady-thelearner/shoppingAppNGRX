import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  recipeChanged = new Subject<Recipe[]>();

  constructor(private sl: ShoppingListService, private http: HttpClient) {}

  private recipes: Recipe[] = [];
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Burger recipe',
  //     'this is Burger',
  //     'https://media.istockphoto.com/photos/juicy-hamburger-on-white-background-picture-id1206323282?k=20&m=1206323282&s=612x612&w=0&h=yatlq6BHRCCvoTzFZLSwaJc0O8Quct_tRPWtH0dj9Fc=',
  //     [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
  //   ),
  //   new Recipe(
  //     'Bread',
  //     'this is bread',
  //     'https://thumbs.dreamstime.com/b/long-loaf-bread-22826883.jpg',

  //     [new Ingredient('Bread', 1), new Ingredient('Butter', 2)]
  //   ),
  // ];
  fetchRecipe(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipe() {
    return this.recipes.slice();
  }
  // getRecipe() {
  //   return this.http
  //     .get<{ recipe: Recipe[] }>(
  //       'https://db-c-cb834-default-rtdb.firebaseio.com/posts.json'
  //     )
  //     .pipe(
  //       map((responseData) => {
  //         const recp: Recipe[] = [];
  //         for (let key in responseData) {
  //           if (responseData.hasOwnProperty(key)) {
  //             recp.push(responseData[key]);
  //           }
  //         }
  //         return recp;
  //       })
  //     );
  // }

  getRecipeNew(index: number) {
    return this.recipes[index];
  }

  addIngToShpList(ing: Ingredient[]) {
    this.sl.addIngredients(ing);
  }

  // addRecipe(recipe : Recipe){
  //   this.recipes.push(recipe);
  //   this.recipeChanged.next(this.recipes.slice());
  // }

  addRecipe(recipe: Recipe) {
    console.log('recipe called');
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
    this.http
      .post('https://db-c-cb834-default-rtdb.firebaseio.com/posts.json', recipe)
      .subscribe((postData) => {
        console.log(postData);
      });
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
