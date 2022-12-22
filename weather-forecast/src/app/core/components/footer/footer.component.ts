import { Component } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  posY$$ = this.scrollService.getPositionY();
  constructor(private scrollService:ScrollService){}
  getStyle(pos:number){
    return pos===0 ? 'height:0px;opacity:0':''
  }
}
