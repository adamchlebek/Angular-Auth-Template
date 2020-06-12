import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwt: JwtHelperService) { }

  decode(){
    return this.jwt.decodeToken(localStorage.getItem('token'))
  }

  isAuthenticated(){
    return !this.jwt.isTokenExpired(localStorage.getItem('token'))
  }

  logout(){
    localStorage.clear()
  }
}
