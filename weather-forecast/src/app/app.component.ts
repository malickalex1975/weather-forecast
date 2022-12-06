import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANG } from './constants';
import { StorageService } from './core/services/storage.service';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'weather-forecast';
  theme$$=this.themeService.getTheme()
  
  constructor(
    private themeService:ThemeService,
    translate: TranslateService,
    storage: StorageService
  ) {
    translate.addLangs(['en', 'ru', ]);
    translate.setDefaultLang('ru');
    const language =
      storage.getItem(LANG) ?? 'en';
    translate.use(language);
  }
}
