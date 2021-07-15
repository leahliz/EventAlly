import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
event:any;
  constructor(private eventService:EventsService,private router:Router) { }

  ngOnInit(): void {
    this.event=history.state.data;
  }
updateEvent(){
this.eventService.update(this.event);
alert("Sucess")
this.router.navigate(["/events"])
}
}
