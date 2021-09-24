import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import { User } from './user.model';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  title: String = "User List";
   

  users: User[] | any;
  document: any;
  constructor(public _auth: AuthService,
    public _router: Router) { }

  ngOnInit(): void {
    this._auth.getUsers().subscribe((data) => {
      console.log(data);
      this.users = JSON.parse(JSON.stringify(data));
    })
  }
  add(){
    this._router.navigate(["/signup"]);
  }
  deleteUser(user: User): void {
    this._auth.deleteUser(user._id)
    .subscribe(data => {
      console.log("del")
      this._router.navigate(["/admin-home"])
      
    });
     }
 /*reloadCurrentPage() {
    this.document.defaultView.location.reload();
    //window.location.reload();
  }*/
  }


