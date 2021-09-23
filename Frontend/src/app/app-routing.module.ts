import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { EventsComponent } from './events/events.component';
import { EventComponent } from './event/event.component';
import { UpdateComponent } from './update/update.component';
import{AddEventComponent} from "./add-event/add-event.component";
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { AboutComponent } from './about/about.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
{path:"events",component:EventsComponent},
{path:"event",component:EventComponent},
{path:"update",component:UpdateComponent},
{path:"addEvent",component:AddEventComponent},
{path:"signup",component:RegisterComponent},
{path:'login',component:LoginComponent},
{path:"about",component:AboutComponent},
{path:"adminlogin",component:AdminloginComponent},
{path:"adminhome",component:AdminHomeComponent},
{ path: 'user-home', component: UserHomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
