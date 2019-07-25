import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  geocoder: google.maps.Geocoder;

  constructor() {
    this.geocoder = new google.maps.Geocoder();
  }

  getRevGeoLocation(lat: number, lng: number): Observable<google.maps.GeocoderResult> {
    if (navigator.geolocation) {
      const latlng = new google.maps.LatLng(lat, lng);
      const request = {
        latLng: latlng
      };
      return Observable.create(observer => {
        // @ts-ignore
        this.geocoder.geocode(request, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            console.log(results[0]);
            observer.next(results[0])
            observer.complete();
          } else {
            console.log('Error: ', results, ' & Status: ', status);
            observer.error();
          }
        });
      });
    }
  }

}
