import { Component, OnInit } from '@angular/core';
import { EventModel } from '../events/eventModel';
import { EventsService } from '../events.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  events: EventModel[];
  event: EventModel;
  constructor(private eventsService: EventsService, public router: Router) { }

  ngOnInit(): void {
    this.eventsService.getEvents().subscribe((data) => {
      this.events = JSON.parse(JSON.stringify(data));
    });
  }
  val: number;
  eventMore(event: any) {
    this.val = event;
    this.event = this.events[this.val];
    this.router.navigate(["/event"], { state: { "data": this.event } });
  }
}
