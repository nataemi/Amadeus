import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  mainHeaderSlogan = 'Pick your travel destination based on the weather';
  basicInfoSlogan = ' Basic travel info';
  weatherInfoSlogan = ' Weather info';

  localization;
  departureDate = new Date();
  returnDate = new Date();
  days: SelectItem[] = [];
  temperature: SelectItem[] = [];
  minDays = 3;
  maxDays = 7;
  minTemp = 25;
  maxTemp = 45;
  selectedWeathers: any[] = [];
  weather: any[] = [ {name: 'clouds', png: 'clouds.png'},
                    {name: 'cloudsAndSun', png: 'cloudAndSun.png'},
                    {name: 'sun', png: 'sunny.png'}];
  rain: any[] =  [
                    {name: 'rain', png: 'raindrops.png'}
                  ];
  selectedRainOption;

  noneWeatherOptionsSelected = false;


  constructor() {
    this.fillDaysArray();
    this.fillTemperatureArray();
  }

  private fillTemperatureArray() {
    const MAXTEMP = 45;
    const MINTEMP = -20;
    this.temperature = Array.from(Range(15, 5, -25));
  }

  private fillDaysArray() {
    const MAXDAYS = 29;
    this.days.push({label: '1 day', value: 1});
    Array(MAXDAYS).fill(0).map((x, i) => {
      this.days.push({label: `${i + 2}` + ' days', value: i + 2});
    });
  }

  ngOnInit(): void {
  }

  checkIfAnyChosen(obj:any){
    if ( this.selectedWeathers.length === 0){
      console.log('pustaaa');
      this.noneWeatherOptionsSelected = true;
    }
    else{
      this.noneWeatherOptionsSelected = false;
    }
  }


}

const Range = function*(total = 0, step = 5, from = 0) {
  for (let i = 0; i < total; yield { label: `${from + i * step}` + '°C', value: from + i++ * step}) {}
};
