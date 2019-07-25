import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {Router} from '@angular/router';
import {GeocodingService} from './geocoding.service';
import {MapsAPILoader} from '@agm/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @ViewChild('search', {static: true})
  public searchElementRef: ElementRef;

  mainHeaderSlogan = 'Pick your travel destination based on the weather';
  localization = '';
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
  lat;
  lng;

  noneWeatherOptionsSelected = false;
  tempError = false;
  daysError = false;
  dateError = false;
  localizationError = false;
  anyErrors = false;
  geolocationPosition;

  geocoder;


  constructor(private router: Router, private geoCodingService: GeocodingService, private zone: NgZone, private mapsAPILoader: MapsAPILoader) {
    this.fillDaysArray();
    this.fillTemperatureArray();
    this.geocoder = new google.maps.Geocoder();
  }



  private fillTemperatureArray() {
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

    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.zone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.localization = place.formatted_address;
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
        });
      });
    });

  }

  getLocation(){
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.geolocationPosition = position,
            console.log(position);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.callRevGeoLocate(this.lat, this.lng);
        },
        error => {
          switch (error.code) {
            case 1:
              console.log('Permission Denied');
              break;
            case 2:
              console.log('Position Unavailable');
              break;
            case 3:
              console.log('Timeout');
              break;
          }
        }
      );
    };
  }

  checkIfAnyChosen() {
    if ( this.selectedWeathers.length === 0) {
      this.noneWeatherOptionsSelected = true;
    } else {
      this.noneWeatherOptionsSelected = false;
    }
  }

  checkIfTempMaxHigherThanMin() {
    if (this.maxTemp < this.minTemp) {
      this.tempError = true;
    } else {
      this.tempError = false;
    }
  }

  checkIfDaysMaxHigherThanMin() {
    if (this.maxDays < this.minDays) {
      this.daysError = true;
    } else {
      this.daysError = false;
    }
  }

  checkIfReturnDayAfterDepartureDay() {
    if (this.departureDate > this.returnDate) {
      this.dateError = true;
    } else {
      this.dateError = false;
    }
  }

  checkLocalization(){
    if(this.localization === '' || this.localization.length < 3){
      this.localizationError = true;
    }
    else {
      this.localizationError = false;
    }
  }

  checkValidationAndSearch(){
    this.checkLocalization();
    this.checkIfDaysMaxHigherThanMin();
    this.checkIfAnyChosen();
    this.checkIfTempMaxHigherThanMin();
    this.checkIfReturnDayAfterDepartureDay();
    console.log(this.localization);
    console.log(this.lat);
    console.log(this.lng);
    if(this.localizationError || this.dateError || this.noneWeatherOptionsSelected || this.daysError || this.tempError){
      this.anyErrors = true;
    }
    else{
      this.router.navigate(['/list']);
    }
  }


  callRevGeoLocate(lat: number, lng: number) {
    this.geoCodingService.getRevGeoLocation(lat, lng).subscribe(
      results => {
        this.zone.run(() => {
          this.localization = results.formatted_address;
        });
      }
    );
  }

}

const Range = function*(total = 0, step = 5, from = 0) {
  for (let i = 0; i < total; yield { label: `${from + i * step}` + '°C', value: from + i++ * step}) {}
};
