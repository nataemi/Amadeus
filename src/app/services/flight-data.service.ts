import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Flight} from '../model/flight';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class FlightDataService {

  localizationSubject = new BehaviorSubject('');
  maxDaysSubject = new BehaviorSubject(0);
  minDaysSubject = new BehaviorSubject(0);
  minTempSubject = new BehaviorSubject(0);
  maxTempSubject = new BehaviorSubject(0);
  selectedRainOptionSubject = new BehaviorSubject([]);
  selectedWeathersSubject = new BehaviorSubject([]);
  departureDateSubject = new BehaviorSubject(0);
  returnDateSubject = new BehaviorSubject(0);
  latitude = new BehaviorSubject(0);
  longtitude = new BehaviorSubject(0);

  public flightlist: Flight[];

  constructor(private http: HttpClient) { }

  setLocalization(input: any) {
    this.localizationSubject.next(input);
  }
  setMinDays(input: any) {
    this.minDaysSubject.next(input);
  }
  setMaxDays(input: any) {
    this.maxDaysSubject.next(input);
  }
  setMinTemp(input: any) {
    this.minTempSubject.next(input);
  }
  setMaxTemp(input: any) {
    this.maxTempSubject.next(input);
  }
  setSelectedRainOption(input: any) {
    this.selectedRainOptionSubject.next(input);
  }
  setSelectedWeathers(input: any) {
    this.selectedWeathersSubject.next(input);
  }
  setDepartureDate(input: any) {
    this.departureDateSubject.next(input);
  }
  setReturnDate(input: any) {
    this.returnDateSubject.next(input);
  }

  setLatitude(input: any) {
    this.latitude.next(input);
  }

  setLongtitude(input: any) {
    this.longtitude.next(input);
  }


  getLongtitude(): Observable<any> {
    return this.longtitude.asObservable();
  }


  getLatitude(): Observable<any> {
    return this.latitude.asObservable();
  }


  getLocalization(): Observable<any> {
    return this.localizationSubject.asObservable();
  }
  getMinDays(): Observable<any> {
    return this.minDaysSubject.asObservable();
  }
  getMaxDays(): Observable<any> {
    return this.maxDaysSubject.asObservable();
  }
  getMinTemp(): Observable<any> {
    return this.minTempSubject.asObservable();
  }
  getMaxTemp(): Observable<any> {
    return this.maxTempSubject.asObservable();
  }
  getSelectedRainOption(): Observable<any> {
    return this.selectedRainOptionSubject.asObservable();
  }
  getSelectedWeathers(): Observable<any> {
    return this.selectedWeathersSubject.asObservable();
  }
  getDepartureDate(): Observable<any> {
    return this.departureDateSubject.asObservable();
  }
  getReturnDate(): Observable<any> {
    return this.returnDateSubject.asObservable();
  }

  getAvailabeFlights(departureDate, maxDays, minDays, returnDate, lat, lng, minTemp, maxTemp, rainOption, weather) {


    const myJSON = <JSON><unknown>{
      'description': {
        'departureDate': moment(departureDate).format('YYYY-MM-DD').toString(),
        "maxDays": maxDays,
        "minDays": minDays,
        "returnDate": moment(returnDate).format('YYYY-MM-DD').toString()
      },
      "flightOriginParameters": {
        "localization": {
          "latitude": lat,
          "longitude": lng,
        },
        "radiusInKilometers": 500
      },
      "weatherCondition": {
        "maxTemp": maxTemp,
        "minTemp": minTemp,
        "selectedRainOption": rainOption,
        "selectedWeather": weather
      }
    };
    console.log(myJSON);
    return this.http.post<Flight[]>('http://localhost:8080/flightadvise',
      myJSON);
  }

}
