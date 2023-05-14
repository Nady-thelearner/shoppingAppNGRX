import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dropDownDirective } from './dropDown.directive';
import { AlertComponent } from './alert/alert.component';
import { loadingSpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [dropDownDirective, AlertComponent, loadingSpinnerComponent],
  imports: [CommonModule],
  exports: [
    dropDownDirective,
    AlertComponent,
    loadingSpinnerComponent,
    CommonModule,
  ],
})
export class SharedModule {}
