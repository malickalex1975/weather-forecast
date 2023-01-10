import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StartService } from 'src/app/core/services/start.service';

@Component({
  selector: 'app-deny-page',
  templateUrl: './deny-page.component.html',
  styleUrls: ['./deny-page.component.scss']
})
export class DenyPageComponent  implements OnInit{
  constructor(private router:Router,private startService:StartService){}
  ngOnInit(): void {
    setTimeout(()=>{this.router.navigate(["./start"]);this.startService.resetStarted()},3000)
  }

}
