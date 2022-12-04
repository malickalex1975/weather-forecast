import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { map, switchMap, tap } from 'rxjs';
import { LanguageService } from 'src/app/core/services/language.service';

@Pipe({
  name: 'translate',
})
export class TranslatePipe implements PipeTransform {
  constructor(private langService: LanguageService, private http: HttpClient) {}

  transform(value: string) {
  
  return this.langService
      .getLang()
      .pipe(switchMap((lang) => this.http.get(`assets/lang/${lang}.json`)),
      map((json:any)=>json[value]),
      tap(data=>console.log(data))
      );
      
  }
}
