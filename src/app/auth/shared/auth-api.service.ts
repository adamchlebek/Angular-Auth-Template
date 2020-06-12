import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  api: string = environment.baseURL;

  constructor(private http: HttpClient) { }

  Login(email: string, password: string){
    return this.http.post(`${this.api}/api/auth/login`, { email, password })
  }

  Register(email: string, password: string, password2: string){
    return this.http.post(`${this.api}/api/auth/register`, { email, password, password2 })
  }
}
