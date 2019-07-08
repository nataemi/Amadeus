import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SearchComponent } from './search/search.component';
import { ListComponent } from './list/list.component';
import {ButtonModule, DropdownModule, InputTextModule, SelectButtonModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {FieldsetModule} from 'primeng/fieldset';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    SelectButtonModule,
    CardModule,
    FieldsetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
