import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ButtonComponent} from './button/button.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {HomeComponent} from './home/home.component';
import {GlobalService} from './global.service';
import {TestComponent} from './test/test.component';
import {SelectComponent} from './select/select.component';
import { SelectOptionComponent } from './select-option/select-option.component';
import { SelectDropdownComponent } from './select-dropdown/select-dropdown.component';
import { SelectPageComponent } from './select-page/select-page.component';
import { TextHighlightPipe } from './text-highlight.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    NotFoundComponent,
    HomeComponent,
    TestComponent,
    SelectComponent,
    SelectOptionComponent,
    SelectDropdownComponent,
    SelectPageComponent,
    TextHighlightPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    GlobalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
