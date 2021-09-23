import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { Router } from '@angular/router';
import { EventsService } from '../events.service';
import { EventModel } from '../events/eventModel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public _auth: AuthService,
    private _router: Router,public eventService:EventsService) { }
search:any;
public name:any;
nval:EventModel;
  ngOnInit(): void {
    this.name=localStorage.getItem('owner');
  }
 
  logoutUser() {
    localStorage.removeItem('token')
    this._router.navigate(['']);
    localStorage.removeItem('owner');
  }
  loggedUser() {
    this._router.navigate(['/books'])
  }
  Search(){
    console.log(this.search);
 this.eventService.searchEvent(this.search)
 .subscribe((data)=>{
   this.nval=data;
   this._router.navigate(["/event"],{state:{"data":this.nval}});
  },
  (err)=>{
    alert("Event Not Found")
  }
  );

  }
}
