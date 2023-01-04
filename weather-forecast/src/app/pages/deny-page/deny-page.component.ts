import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deny-page',
  templateUrl: './deny-page.component.html',
  styleUrls: ['./deny-page.component.scss']
})
export class DenyPageComponent  implements OnInit{
  constructor(private router:Router){}
  ngOnInit(): void {
    setTimeout(()=>this.router.navigate(["./start"]),3000)
  }

}
