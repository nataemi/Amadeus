import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

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

  localization = this.localizationSubject.asObservable();
  minDays = this.minDaysSubject.asObservable() ;
  maxDays = this.maxDaysSubject.asObservable() ;
  minTemp = this.minTempSubject.asObservable() ;
  maxTemp = this.maxTempSubject.asObservable();
  selectedRainOption = this.selectedRainOptionSubject.asObservable();
  selectedWeathers = this.selectedWeathersSubject.asObservable();
  departureDate = this.departureDateSubject.asObservable();
  returnDate = this.returnDateSubject.asObservable();
  constructor() { }

  setLocalization(input: any){
    this.localizationSubject.next(input);
  }
  setMinDays(input: any){
    this.minDaysSubject.next(input);
  }
  setMaxDays(input: any){
    this.maxDaysSubject.next(input);
  }
  setMinTemp(input: any){
    this.minTempSubject.next(input);
  }
  setMaxTemp(input: any){
    this.maxTempSubject.next(input);
  }
  setSelectedRainOption(input: any){
    this.selectedRainOptionSubject.next(input);
  }
  setSelectedWeathers(input: any){
    this.selectedWeathersSubject.next(input);
  }
  setDepartureDate(input: any){
    this.departureDateSubject.next(input);
  }
  setReturnDate(input: any){
    this.returnDateSubject.next(input);
  }


  getLocalization(): Observable<any>{
    return this.localizationSubject.asObservable();
  }
  getMinDays(): Observable<any>{
    return this.minDaysSubject.asObservable();
  }
  getMaxDays(): Observable<any>{
    return this.maxDaysSubject.asObservable();
  }
  getMinTemp(): Observable<any>{
    return this.minTempSubject.asObservable();
  }
  getMaxTemp(): Observable<any>{
    return this.maxTempSubject.asObservable();
  }
  getSelectedRainOption(): Observable<any>{
    return this.selectedRainOptionSubject.asObservable();
  }
  getSelectedWeathers(): Observable<any>{
    return this.selectedWeathersSubject.asObservable();
  }
  getDepartureDate(): Observable<any>{
    return this.departureDateSubject.asObservable();
  }
  getReturnDate(): Observable<any>{
    return this.returnDateSubject.asObservable();
  }
}
