import { Component } from '@angular/core';
import { IPlace } from 'src/app/constants';
import { RememberPlacesService } from 'src/app/core/services/remember-places.service';
import { RequestService } from 'src/app/core/services/request.service';

@Component({
  selector: 'app-last-places',
  templateUrl: './last-places.component.html',
  styleUrls: ['./last-places.component.scss'],
})
export class LastPlacesComponent  {
  places$$ = this.rememberPlaces.getSubject();
  constructor(private rememberPlaces: RememberPlacesService, private requestService:RequestService) {}


  callPlace(place: IPlace) {
    this.requestService.setRequest(place.name)
    this.requestService.setCoords(place.lat,place.lon)
  }
  clear(){
    this.rememberPlaces.clearPlaces()
  }
}
