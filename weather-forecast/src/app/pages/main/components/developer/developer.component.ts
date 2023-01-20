import { Component, Input, OnInit } from '@angular/core';
import { DEVELOPER } from 'src/app/developer';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss'],
})
export class DeveloperComponent  implements  OnInit{
  @Input() index = 0;
  @Input()
  developer?: DEVELOPER;
 

  constructor(){}
  ngOnInit(): void {
   
  }
}
