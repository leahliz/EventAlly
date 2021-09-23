import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  name = new FormControl('');
  constructor(public _auth:AuthService,public _router:Router) { }

  ngOnInit(): void {
  }
  user = {
    email: '',
    password: ''
  };
  validateUser() {
    this._auth.validateUser(this.user)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token)
          localStorage.setItem("owner",'admin@123.com')
         localStorage.setItem("userType", 'admin')
          this._router.navigate(['/adminhome'])
          .then(()=>{
            window.location.reload();
          });
        },
        err => {
          console.log(err);
          alert("Not Admin")
          this._router.navigate([''])
        }
      )
  }
}
