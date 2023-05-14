import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import {Subject} from 'rxjs';

export class ShoppingListService {
  ingredientsChange = new EventEmitter<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];



  getIngredient() {
    return this.ingredients.slice();
    //this will not work as we are returning a copy of the original array
    //but not the original array , so once we add new element to the original
    //array it is not reflected in the copy array as we didnt add anything in
    //that array(copied array)
    //To resolve this whenever we add elements to the array we emit the event
    //this way we get the right array.
  }
  getIngredientNew(index : number){
    console.log("inside Service",this.startedEditing);
    return this.ingredients[index];

  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChange.emit(this.ingredients.slice());

  }

  addIngredients(ing : Ingredient[]){
    this.ingredients.push(...ing);
    this.ingredientsChange.emit(this.ingredients.slice());
  }

  updateIngredients(index : number , newIngredients : Ingredient){
    this.ingredients[index] = newIngredients;
    this.ingredientsChange.next(this.ingredients.slice());
  }
  deleteIngredients(index :number){
    this.ingredients.splice(index,1);
    this.ingredientsChange.next(this.ingredients.slice());
  } 

}
