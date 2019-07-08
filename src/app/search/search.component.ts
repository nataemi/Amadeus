import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  headerSlogan = 'Pick your travel destination based on the weather';
  localization;
  departureDate;
  returnDate;
  days: SelectItem[] = [];
  temperature: SelectItem[] = [];
  minDays = 3;
  maxDays = 7;
  minTemp;
  maxTemp;
  selectedWeathers: any[] = [];
  weather: any[] = [];
  rain: any;
  selectedRainOption;


  constructor() {
    const MAXDAYS = 30;
    Array(MAXDAYS).fill(0).map((x, i) => {
      this.days.push({ label: `${i + 1}`, value: i + 1 });
    });
    console.log(this.days);

    const MAXTEMP = 45;
    const MINTEMP = -20;
    this.temperature = Array.from(Range(15, 5, -25));
    console.log(this.temperature);

    this.weather = [
      {name: 'clouds', png: 'clouds.png'},
      {name: 'cloudsAndSun', png: 'cloudAndSun.png'},
      {name: 'sun', png: 'sunny.png'}
    ];
    this.rain = [
      {name: 'rain', png: 'raindrops.png'}
    ];
  }

  ngOnInit(): void {
  }


}

const Range = function*(total = 0, step = 5, from = 0){
  for (let i = 0; i < total; yield { label: `${from + i * step}` + '°C', value: from + i++ * step}) {}
};
