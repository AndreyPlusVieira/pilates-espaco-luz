import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fale-conosco',
  templateUrl: './fale-conosco.component.html',
  styleUrls: ['./fale-conosco.component.scss'],
})
export class FaleConoscoComponent implements OnInit {
  display: any;
  center: google.maps.LatLngLiteral = {
    lat: -27.815384060290764,
    lng: -50.33540348244907,
  };
  position: google.maps.LatLngLiteral = {
    lat: -27.815384060290764,
    lng: -50.33540348244907,
  };
  zoom = 18;

  constructor() {}

  ngOnInit(): void {}

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.display = event.latLng.toJSON();
    }
  }
}
