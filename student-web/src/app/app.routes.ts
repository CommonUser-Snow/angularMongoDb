import { Routes } from '@angular/router';
import { HomeComponent } from './student/home/home.component';

export const routes: Routes = [
    {path:"students/home",component:HomeComponent},
    {path:"students",redirectTo:"studends/home",pathMatch:"full"},
    {path:"",redirectTo:"students/home",pathMatch:"full"},

];
