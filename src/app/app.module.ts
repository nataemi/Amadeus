import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SearchComponent } from './search/search.component';
import { ListComponent } from './list/list.component';
import {ButtonModule, DropdownModule, InputTextModule, MessageService, SelectButtonModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {FieldsetModule} from 'primeng/fieldset';
import {RouterModule, Routes} from '@angular/router';
import {ToastModule} from 'primeng/toast';
import { GooglePlacesDirective } from './search/google-places.directive';
import { AgmCoreModule } from '@agm/core';


const appRoutes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'list',      component: ListComponent },
  { path: '**', redirectTo: ''}
];


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ListComponent,
    GooglePlacesDirective
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
    FieldsetModule,
    RouterModule.forRoot(
      appRoutes),
    ToastModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    })
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

