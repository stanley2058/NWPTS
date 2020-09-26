import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassroomManageComponent } from './classroom-manage/classroom-manage.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "classroom/ta/:sid", component: ClassroomManageComponent },
  { path: "classroom/ta", component: ClassroomManageComponent },
  { path: "classroom/:sid", component: ClassroomComponent },
  { path: "classroom", component: ClassroomComponent },
  { path: "profile", component: ProfileComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
