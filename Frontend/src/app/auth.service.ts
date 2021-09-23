import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "./interfaces/user"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loginUrl = "http://localhost:3100/login";

  registerUser(user: User) {
    return this.http.post<any>("http://localhost:3100/register", {"user":user});
  }
  validateUserLogin(user: any) {
    return this.http.post<any>("http://localhost:3100/login", user);
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

  getUsers() {
    return this.http.get("http://localhost:3100/users")
  }
  deleteUser(id: any) {
    return this.http.delete("http://localhost:3100/removeUsers/" + id)
  }

  
  validateUser(user: any) {
    return this.http.post<any>("http://localhost:3100/adminLogin", user);
  }

}
