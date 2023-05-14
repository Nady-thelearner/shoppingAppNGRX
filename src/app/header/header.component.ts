import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { authService } from '../auth/auth.service';
import { RecipeService } from '../recipes/recipe.service';
import { dataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  //  recipe !: Recipe[];
  userSub!: Subscription;
  isAuthenticated = false;
  constructor(
    private dataStorageSF: dataStorageService,
    private recipeSF: RecipeService,
    private authService: authService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((userData) => {
      this.isAuthenticated = !!userData;
    });
  }

  onSaveData() {
    this.dataStorageSF.storeRecipes();
  }
  onFetchData() {
    const recipe = this.dataStorageSF.fetchRecipe().subscribe();
    console.log('fetch result', recipe);
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
