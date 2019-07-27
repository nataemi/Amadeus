import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Flight} from '../model/flight';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlightDataService{

  localizationSubject = new BehaviorSubject('');
  maxDaysSubject = new BehaviorSubject(0);
  minDaysSubject = new BehaviorSubject(0);
  minTempSubject = new BehaviorSubject(0);
  maxTempSubject = new BehaviorSubject(0);
  selectedRainOptionSubject = new BehaviorSubject([]);
  selectedWeathersSubject = new BehaviorSubject([]);
  departureDateSubject = new BehaviorSubject(0);
  returnDateSubject = new BehaviorSubject(0);

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

  getAvailabeFlights() {

    const myJSON = JSON.parse('{\n' +
      ' "description": {\n' +
      '   "departureDate": "2019-07-27",\n' +
      '   "maxDays": 2,\n' +
      '   "minDays": 1,\n' +
      '   "returnDate": "2019-07-28"\n' +
      ' },\n' +
      ' "flightOriginParameters": {\n' +
      '   "localization": {\n' +
      '     "latitude": 49.0,\n' +
      '     "longitude": 2.55\n' +
      '   },\n' +
      '   "radiusInKilometers": 500\n' +
      ' },\n' +
      ' "weatherCondition": {\n' +
      '   "maxTemp": 40,\n' +
      '   "minTemp": 15,\n' +
      '   "selectedRainOption": true,\n' +
      '   "selectedWeather": [\n' +
      '     "sunny", "partly", "cloudy"\n' +
      '   ]\n' +
      ' }\n' +
      '}');
    console.log(myJSON);
    return this.http.post<Flight[]>('http://localhost:8080/flightadvise',
      myJSON);
  }

}
