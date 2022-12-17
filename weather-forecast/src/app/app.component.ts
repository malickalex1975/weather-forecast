import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANG } from './constants';
import { ScrollService } from './core/services/scroll.service';
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
  posY$$ = this.scrollService.getPositionY();
  scrollHeight$$=this.scrollService.getScrollHeight()
  downPos = document.querySelector('.app-container')?.scrollHeight

  constructor(
    private scrollService: ScrollService,
    private themeService:ThemeService,
    translate: TranslateService,
    storage: StorageService
  ) {
    translate.addLangs(['en', 'ru', ]);
    translate.setDefaultLang('ru');
    const language =
      storage.getItem(LANG) ?? 'ru';
    translate.use(language);
  }
goUp(){
  window.scrollTo(0,0)
}
goDown(){
  window.scrollBy(0, window.innerHeight -150);
}
}
