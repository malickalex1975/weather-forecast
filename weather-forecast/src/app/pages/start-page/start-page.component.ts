import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { StartService } from 'src/app/core/services/start.service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
})
export class StartPageComponent implements OnInit {

  number$=timer(0,1000);
  constructor(private startService: StartService, private router: Router) {}

  ngOnInit(): void {
    setTimeout(()=>{this.start()}
    ,5000)
  }
  start(){
    this.startService.setStarted();
    this.router.navigate(['../'])
  }
}
