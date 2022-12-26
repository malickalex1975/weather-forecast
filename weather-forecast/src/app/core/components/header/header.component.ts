import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANG, THEME } from 'src/app/constants';
import { ColorService } from '../../services/color.service';
import { LanguageService } from '../../services/language.service';
import { ScrollService } from '../../services/scroll.service';
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
  posY$$ = this.scrollService.getPositionY();

  constructor(
    private langService: LanguageService,
    private storage: StorageService,
    private themeService: ThemeService,
    private colorService: ColorService,
    private translateService: TranslateService,
    private scrollService: ScrollService
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
  getHeaderColor(color:string, posY:number) {
    if (posY===0){return `background-image: linear-gradient(#cceeff 30%, ${color} 100%)`}
    return `background-image: linear-gradient(${color} 10%, rgba(204, 238, 255, 0.9 ) 100%); height:50px;`
  }
  exit(){
    window.history.back()
  }
}