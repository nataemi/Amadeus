import { Component, OnInit } from '@angular/core';
import { FlightDataService } from '../services/flight-data.service';
import { SelectItem } from 'primeng/api';
import { Flight } from '../model/flight';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {





  days: SelectItem[] = [];
  mainHeaderSlogan = 'available flights';
  localization = '';
  noneWeatherOptionsSelected = false;
  minDays;
  maxDays;
  minTemp;
  maxTemp;
  selectedRainOption;
  selectedWeathers: any[] = [{ name: 'sun', png: 'sunny.png'}, { name: 'cloudsAndSun', png: 'cloudAndSun.png' }];
  returnDate;
  departureDate;
  weather: any[] = [{ name: 'clouds', png: 'clouds.png' },
  { name: 'cloudsAndSun', png: 'cloudAndSun.png' },
  { name: 'sun', png: 'sunny.png' }];
  temperature: SelectItem[] = [];
  rain: any[] = [
    { name: 'rain', png: 'raindrops.png' }
  ];
  raining = false;
  lat;
  lng;
  loading = true;

  missingWeathers = this.weather;
  // flight1 = new Flight('Barcelona', new Date(), new Date(), true, this.weather, 27, 'Wroclaw', 1234, 'https://www.wakacje.pl');
  // flight2 = new Flight('Dubaj', new Date(), new Date(), false, this.weather, 47, 'Berlin', 4312, 'https://www.urlop.pl');

  f: Flight[];


selectedFlight: Flight;
displayDialog: boolean;
sortOptions: SelectItem[];
sortKey: string;
sortField: string;
sortOrder: number;



  constructor(private dataService: FlightDataService ) {
    this.fillTemperatureArray();
    this.fillDaysArray();
   }

   private fillDaysArray() {
    const MAXDAYS = 29;
    this.days.push({ label: '1 day', value: 1 });
    Array(MAXDAYS).fill(0).map((x, i) => {
      this.days.push({ label: `${i + 2}` + ' days', value: i + 2 });
    });
  }

  selectFlight(event: Event, flight: Flight) {
    this.selectedFlight = flight;
    this.displayDialog = true;
    event.preventDefault();
}
onSortChange(event) {
  const value = event.value;

  if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
  } else {
      this.sortOrder = 1;
      this.sortField = value;
  }
}
onDialogHide() {
  this.selectedFlight = null;
}


  ngOnInit() {

    this.sortOptions = [
      {label: 'Price', value: 'price'}
  ];


    this.checkIfWeatherSelected();
    this.dataService.getLocalization().subscribe(data => {
      this.localization = data;
    });
    this.dataService.getMinDays().subscribe(data => {
      this.minDays = data;
    });
    this.dataService.getMaxDays().subscribe(data => {
      this.maxDays = data;
    });
    this.dataService.getMinTemp().subscribe(data => {
      this.minTemp = data;
    });
    this.dataService.getMaxTemp().subscribe(data => {
      this.maxTemp = data;
    });
    this.dataService.getSelectedRainOption().subscribe(data => {
      this.selectedRainOption = data;
      if(data.length !== 0){
        this.rain = this.selectedRainOption;
        this.raining = true;
      }
    });
    this.dataService.getSelectedWeathers().subscribe(data => {
      this.selectedWeathers = data;
    });
    this.dataService.getDepartureDate().subscribe(data => {
      this.departureDate = data;
      if (data == 0) {
        this.departureDate = new Date();
      }
    });
    this.dataService.getReturnDate().subscribe(data => {
      this.returnDate = data;
      if (data === 0) {
        this.returnDate = new Date();
      }
    });
    this.dataService.getLatitude().subscribe(data => {
      this.lat = data;
    });
    this.dataService.getLongtitude().subscribe(data => {
      this.lng = data;
    });

    let weathersNameList = [];
    this.selectedWeathers.map(value => weathersNameList.push(value['name']));

    this.dataService.getAvailabeFlights(
      this.departureDate, this.maxDays, this.minDays,
      this.returnDate, this.lat, this.lng, this.minTemp, this.maxTemp, this.raining, weathersNameList).subscribe(
      value => {
        this.f = value;
        console.log(this.f);
        this.loading = false;
      }
    );
  }

  checkIfWeatherSelected(): boolean {
    if (this.selectedWeathers.length !== 3) {
      this.updateMissingWeather();
      return true;
    }
    return false;
  }

  updateMissingWeather() {
    for (let i = 0; i < this.selectedWeathers.length; i++) {
      if (this.missingWeathers.includes(this.selectedWeathers[i])) {
        this.missingWeathers.splice(this.selectedWeathers[i]);
      }
    }
  }

  private fillTemperatureArray() {
    const MAXTEMP = 45;
    const MINTEMP = -20;
    this.temperature = Array.from(Range(15, 5, -25));
  }

}
const Range = function* (total = 0, step = 5, from = 0) {
  for (let i = 0; i < total; yield { label: `${from + i * step}` + '°C', value: from + i++ * step }) { }
};
