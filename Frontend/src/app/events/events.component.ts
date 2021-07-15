import { Component, OnInit } from '@angular/core';
import { EventModel } from './eventModel';
import { EventsService } from '../events.service';
import{Router} from "@angular/router";
import { CarouselComponent, IvyCarouselModule } from 'angular-responsive-carousel';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
events:EventModel[];
event:EventModel;
  constructor(private eventsService:EventsService,public router:Router) { }

  ngOnInit(): void {
    
    this.eventsService.getEvents().subscribe((data)=>{
      this.events=JSON.parse(JSON.stringify(data));
    });
  }
  
  val:number;
  eventMore(event:any){
    this.val=event;
    this.event=this.events[this.val];
    this.router.navigate(["/event"],{state:{"data":this.event}});
  }

}
