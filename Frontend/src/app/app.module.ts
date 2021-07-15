import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { EventComponent } from './event/event.component';
import { HeaderComponent } from './header/header.component';
import { UpdateComponent } from './update/update.component';

import { EventsService } from './events.service';
import { FooterComponent } from './footer/footer.component';
import { AddEventComponent } from './add-event/add-event.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { LoginComponent } from './login/login.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { RegisterComponent } from './register/register.component';




@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    EventComponent,
    HeaderComponent,
    UpdateComponent,
    FooterComponent,
    AddEventComponent,
    LoginComponent,
    UserHomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IvyCarouselModule
  ],
  providers: [EventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
