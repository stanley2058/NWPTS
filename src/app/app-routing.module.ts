import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassroomComponent } from './classroom/classroom.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "classroom", component: ClassroomComponent },
  { path: "classroom/:sid", component: ClassroomComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
