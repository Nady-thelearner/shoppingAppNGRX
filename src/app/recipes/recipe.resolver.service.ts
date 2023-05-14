import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { dataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class reipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageSF: dataStorageService,
    private recipeSF: RecipeService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    const recipe = this.recipeSF.getRecipe();
    if (recipe.length === 0) {
      return this.dataStorageSF.fetchRecipe();
    }
    return recipe;
  }
}
