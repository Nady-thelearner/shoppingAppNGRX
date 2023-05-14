import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients : Ingredient[] }>
  private subscription!: Subscription;
  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) {}

  ngOnInit() {
    this.ingredients =this.store.select('shoppingList');
    // this.subscription = this.shoppingListService.ingredientsChange.subscribe(
    //   (ing: Ingredient[]) => (this.ingredients = ing)
    // );
    // this.ingredients = this.shoppingListService.getIngredient(); //onLoad Fetch.
  }
  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
    console.log(index);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
