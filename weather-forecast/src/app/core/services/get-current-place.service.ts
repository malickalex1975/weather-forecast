import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetCurrentPlaceService {
  constructor(private http: HttpClient) {}
  getIP() {
    return this.http.get('https://jsonip.com');
  }
  getPlace() {
    return this.getIP().pipe(
      map((data: any) => data.ip),
      switchMap((ip) =>
        this.http.get(`http://www.geoplugin.net/json.gp?ip=${ip}`)
      )
    );
  }
}
