import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { switchMap, tap } from 'rxjs';
import { LANG, THEME } from 'src/app/constants';
import { ColorService } from '../../services/color.service';
import { LanguageService } from '../../services/language.service';
import { StorageService } from '../../services/storage.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  currentLang$$ = this.langService.getLang();
  currentTheme$$ = this.themeService.getTheme();
  tempColor$$ = this.colorService.emitColor();
  constructor(
    private langService: LanguageService,
    private storage: StorageService,
    private themeService: ThemeService,
    private colorService:ColorService,
    private translateService:TranslateService
  ) {}

  langToggle() {
    let newLang = this.storage.getItem(LANG) === 'ru' ? 'en' : 'ru';
    this.langService.setLang(newLang);
    
      this.translateService.use(newLang);
      
    
  }
  themeToggle() {
    let newTheme = this.storage.getItem(THEME) === 'light' ? 'dark' : 'light';
    this.themeService.setTheme(newTheme);
  }
  getStyle(theme: string | null) {
    return theme === 'light'
      ? 'background-color: yellow'
      : 'background-color: black';
  }
  getHeaderColor(){}
}
