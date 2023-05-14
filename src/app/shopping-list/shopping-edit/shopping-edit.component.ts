import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm!: NgForm;
  subs!: Subscription;
  editMode = false;
  editedItemIndex!: number;
  editedItems!: Ingredient;

  constructor(private slServie: ShoppingListService) {}

  ngOnInit(): void {
    this.subs = this.slServie.startedEditing.subscribe((index: number) => {
      this.editedItemIndex = index;
      // console.log('shopping Edit', index);
      this.editMode = true;
      this.editedItems = this.slServie.getIngredientNew(index);
      this.slForm.setValue({
        name: this.editedItems.name,
        amount: this.editedItems.amount,
      });
    });
  }
  onAddItem(form: NgForm) {
    let value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slServie.updateIngredients(this.editedItemIndex, newIngredient);
    } else {
      this.slServie.addIngredient(newIngredient);
    }

    form.reset();
    this.editMode = false;
  }

  onCLear() {
    let form = this.slForm;
    form.reset();
    this.editMode = false;
  }
  OnDelete() {
    this.slServie.deleteIngredients(this.editedItemIndex);
    this.onCLear();
    this.editMode = false;
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
