import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AUTH_HASH } from 'src/app/constants';
import { AuthService } from 'src/app/core/services/auth.service';
import { HashService } from 'src/app/core/services/hash.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  login = '';
  password = '';
  url = '';
  subscription?: Subscription;
  constructor(
    private router: Router,
    private hashService: HashService,
    private authservice: AuthService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.subscription= this.route.params.subscribe(param=>this.url=param['url'])
  }
  submit() {
    let hash = this.hashService.getHash(this.login + this.password);
    if (hash === AUTH_HASH) {
      this.authservice.setIsLogin();
      this.router.navigate([`${this.url}`]);
    } else {
      this.router.navigate(['./access_denied']);
    }
  }
}
