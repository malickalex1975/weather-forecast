import { Component } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { LanguageService } from 'src/app/core/services/language.service';
import { DEVELOPER, DEVELOPERS } from 'src/app/developer';
import { DEVELOPERS_RU } from 'src/app/developer-ru';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  developers$:Observable<DEVELOPER[]>=this.getCurrentDeveloper()
  constructor(private langService: LanguageService) {}

  getCurrentDeveloper() {
    return this.langService.getLang().pipe(
      switchMap((lang) => {
        if (lang === 'ru') {
          return of(DEVELOPERS_RU);
        } else return of(DEVELOPERS);
      })
    );
  }
}
