import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
isLogin=false;
  constructor() { }
setIsLogin(){
  this.isLogin=true;
}
getIsLogin(){
  return this.isLogin
}
checkLogin(login:string, password:string){

}
}
