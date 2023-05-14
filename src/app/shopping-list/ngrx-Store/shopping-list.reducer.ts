import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";
import * as shoppingListActions from "./shopping-list.actions";


const initialState = {
  ingredients : [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]
};

export function shhoppingListreducer(state = initialState , action : shoppingListActions.Addingredient){
switch(action.type){
  case  shoppingListActions.ADD_INGREDIENT :
  return {
    ...state,
    ingredients :[ ...state.ingredients , action.payload]
  }

  default :
  return state;
}


}
