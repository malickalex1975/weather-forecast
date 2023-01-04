import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_HASH } from 'src/app/constants';
import { AuthService } from 'src/app/core/services/auth.service';
import { HashService } from 'src/app/core/services/hash.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  login=''
  password=''
  constructor(
    private router: Router,
    private hashService: HashService,
    private authservice: AuthService
  ) {}
  submit(){
    let hash=this.hashService.getHash(this.login+this.password)
    if(hash===AUTH_HASH){
      this.authservice.setIsLogin()
      this.router.navigate(['./canvas'])
    }else{ this.router.navigate(['./access_denied'])}
  }
}
