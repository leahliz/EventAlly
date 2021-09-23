import { Component, OnInit } from '@angular/core';
import { User } from "../interfaces/user";
import { AuthService } from "../auth.service";
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = {
    _id:'',
    name: '',
    email: '',
    password: '',
  };
  constructor(private _auth: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
  }
  registerUser() {
    console.log("Registering the User..");
    this._auth.registerUser(this.user)
      .subscribe(
        (res) => {
        localStorage.setItem("token",res.token);
        this._router.navigate(['login']);
        }
      )
    alert("Registration Success! Login to Continue");
  
  }
}
