import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';

import { CoreModule } from './core.module';
import { StoreModule} from '@ngrx/store';
import { shhoppingListreducer } from './shopping-list/ngrx-Store/shopping-list.reducer';

// import { TestToggelComponent } from './test-toggel/test-toggel.component';
// import { basicHighLightDirective } from './test-toggel/directive/basic-highlight.directive';
// import { AppAdvDirectiveDirective } from './test-toggel/directive/app-adv-directive.directive';
// import { HostBindingDirective } from './test-toggel/directive/host-binding.directive';
// import { UnlessDirective } from './test-toggel/directive/unless.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

    //  TestToggelComponent,
    //  basicHighLightDirective,
    //  AppAdvDirectiveDirective,
    //  HostBindingDirective,
    //  UnlessDirective
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({shoppingList : shhoppingListreducer}),
    ReactiveFormsModule,
    SharedModule,
    CoreModule,
  ],
  exports: [FormsModule, ReactiveFormsModule],

  bootstrap: [AppComponent],
})
export class AppModule {}
