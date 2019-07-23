import {Directive, ElementRef, OnInit} from '@angular/core';
/// <reference types="@types/googlemaps" />

@Directive({
  selector: '[google-place]'
})
export class GooglePlacesDirective implements OnInit{

  private element: HTMLInputElement;

  constructor(private elRef: ElementRef) {
    this.element = elRef.nativeElement;
  }

  ngOnInit() {
    const autocomplete = new google.maps.places.Autocomplete(this.element);
  }

}
