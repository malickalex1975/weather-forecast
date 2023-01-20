import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { LANG } from './constants';
import { ScrollService } from './core/services/scroll.service';
import { StorageService } from './core/services/storage.service';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'weather-forecast';
  theme$$ = this.themeService.getTheme();
  posY$$ = this.scrollService.getPositionY();
  scrollHeight$$ = new BehaviorSubject(0);

  constructor(
    private scrollService: ScrollService,
    private themeService: ThemeService,
    translate: TranslateService,
    storage: StorageService
  ) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('ru');
    const language = storage.getItem(LANG) || 'ru';
    translate.use(language);
  }
  ngOnInit(): void {
    let appContainer = document.querySelector('.app-container') as HTMLElement;
    this.scrollHeight$$ = this.scrollService.getScrollHeight(appContainer!);
  }

  goUp() {
    window.scrollTo(0, 0);
  }
  goDown() {
    window.scrollBy(0, window.innerHeight - 150);
  }
  checkPosition(condition:boolean) {
    if (!condition) {
      navigator.vibrate(50);
    }
  }
  
}
