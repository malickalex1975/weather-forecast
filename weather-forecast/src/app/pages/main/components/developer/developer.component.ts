import { Component, Input } from '@angular/core';
import { DEVELOPER } from 'src/app/developer';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss'],
})
export class DeveloperComponent {
  @Input() index = 0;
  @Input()
  developer?: DEVELOPER;
}
