import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "./interfaces/user"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loginUrl = "http://localhost:3000/login";

  registerUser(user: User) {
    return this.http.post<any>("http://localhost:3000/register", user);
  }
  validateUserLogin(user: any) {
    return this.http.post<any>("http://localhost:3000/login", user);
  }
  constructor(private http: HttpClient) { }

  loginUser(user: any) {
    return this.http.post<any>(this._loginUrl, user)
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }
  getToken() {
    return localStorage.getItem('token')
  }

}
