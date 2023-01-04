import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  onScroll$$ = new BehaviorSubject(0);
  scrollHeight$$ = new BehaviorSubject(document.body.scrollHeight );
 
  constructor() {
  
  
  }
 
  setListener(element:HTMLElement){
    document.addEventListener('scroll', () => {
      this.scrollHeight$$.next(
        element!.scrollHeight - window.pageYOffset- window.innerHeight
      );
      this.onScroll$$.next(window.pageYOffset);
    });
    document.addEventListener('mousemove', () => {
      this.scrollHeight$$.next(
        element!.scrollHeight -window.pageYOffset-window.innerHeight
      );
      this.onScroll$$.next(window.pageYOffset);
    });
  }
  getPositionY() {
    return this.onScroll$$;
  }
  getScrollHeight(element:Element) {
    this.setListener(element as HTMLElement)
    return this.scrollHeight$$;
  }
}
