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
<<<<<<< HEAD

=======
>>>>>>> 96fa65463bc275f1427740f7ffef434324a1cbe9
import { FlightDataService } from './services/flight-data.service';
import {DataViewModule} from 'primeng/dataview';
import {DialogModule} from 'primeng/dialog';
import {PanelModule} from 'primeng/panel';
<<<<<<< HEAD

import { AgmCoreModule } from '@agm/core';

AgmCoreModule.forRoot({
  apiKey: 'AIzaSyDEovhn2gcEMTwTMg6bD_OgfPH0X0tRKPI'
})

=======
import { GooglePlacesDirective } from './search/google-places.directive';
import { AgmCoreModule } from '@agm/core';

>>>>>>> 96fa65463bc275f1427740f7ffef434324a1cbe9
const appRoutes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'list',      component: ListComponent },
  { path: '**', redirectTo: ''}
];


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
    DialogModule,
    PanelModule,
    SelectButtonModule,
    DataViewModule,
    CardModule,
    FieldsetModule,
    RouterModule.forRoot(
      appRoutes),
    ToastModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    })
  ],
  providers: [MessageService, FlightDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

