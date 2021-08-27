import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import * as L from 'leaflet'
declare const LeafletMap: any; 
@Component({
  selector: 'app-map-leaflet',
  templateUrl: './map-leaflet.component.html',
  styleUrls: ['./map-leaflet.component.scss']
})
export class MapLeafletComponent implements OnInit {
map :any;
public layers!: any[];

STYLE_INITIAL = {
  color: '#4974ff',
  fillOpacity: 0.7,
  weight: 2
};

STYLE_HOVER = {
  weight: 5,
  color: 'white'
};
  constructor(private http: HttpClient) { 
    this.layers = [];
  }

  ngOnInit(): void {
    this.createMap();
   // LeafletMap()
  }
  createMap() {
    const parcThabor = {
      lat: 48.114384,
      lng: -1.669494,
    };

    const zoomLevel = 2;

    this.map = L.map('map', {
      center: [parcThabor.lat, parcThabor.lng],
      zoom: zoomLevel
      
    });

    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 2,
      maxZoom: 15,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    mainLayer.addTo(this.map);

    L.control.scale().addTo(this.map);

    //marqueur
    const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    });
   // L.marker([50.6311634, 3.0599573], {icon: myIcon}).bindPopup('Je suis un Frugal Marqueur').addTo(this.map).openPopup();
    let markData  = [{lat: 2.2556, lng: 0.25555},{lat: 25.2556, lng: 28.25555},{lat: 46.2556, lng: 20.25555},{lat: 10.2556, lng: 56.25555},{lat: 78.2556, lng: 78.25555},{lat: 50.2556, lng:8.25555}]
    markData.forEach(e => {
      L.marker([e.lat, e.lng], {icon: myIcon}).bindTooltip("tooltip").addTo(this.map);
    })
    
    //data
  
   // L.geoJSON(data, {style: this.style}).addTo(this.map);

}

  //color
  getColor(d: any) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}
//style
style(feature: any) {
  return {
      fillColor: this.getColor(feature.properties.density),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

}
