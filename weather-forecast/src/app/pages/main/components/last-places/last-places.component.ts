import { Component } from '@angular/core';
import { IPlace, LAST_COORD } from 'src/app/constants';
import { RememberPlacesService } from 'src/app/core/services/remember-places.service';
import { RequestService } from 'src/app/core/services/request.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-last-places',
  templateUrl: './last-places.component.html',
  styleUrls: ['./last-places.component.scss'],
})
export class LastPlacesComponent {
  places$$ = this.rememberPlaces.getSubject();
  hovered?: IPlace | null;
  constructor(
    private rememberPlaces: RememberPlacesService,
    private requestService: RequestService,
    private storage:StorageService
  ) {}

  callPlace(place: IPlace) {
    this.requestService.setRequest(place.name);
    this.requestService.setCoords(place.lat, place.lon);
    this.storage.setItem(LAST_COORD, JSON.stringify([place.lat,place.lon]))
    window.scrollTo(0, 0);
  }
  clean() {
    this.rememberPlaces.clearPlaces();
  }
  delete(place:IPlace){
    this.rememberPlaces.delete(place)
  }
  getFlagStyle(country:string){
    return `background-image: url(assets/img/png/${country.toLowerCase()}.png)`
   }
}
