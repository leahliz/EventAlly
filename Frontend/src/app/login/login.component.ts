import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { Router } from '@angular/router'
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _auth: AuthService,
    private _router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  user = {
    email: '',
    password: ''
  };
  validateUserLogin() {
    this._auth.validateUserLogin(this.user)
      .subscribe(
        (res) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem("owner",res.email)
          // this.loginOccured.emit(1);
          localStorage.setItem("userType", 'user');
          this._router.navigate(['/events'])
          .then(()=>{
            window.location.reload();
          });
        },
        (err) => {
          console.log(err);
          this._router.navigate(['/']);
          alert('Invalid Credentials! Please try again!')

        }
      )
    // alert('Successfully Validated! Logging in..')

  }
}
