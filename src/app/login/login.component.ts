import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassroomService } from '../service/classroom-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(
    private classroomService: ClassroomService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.classroomService.hasLogin().then(res => {
      if (res) this.router.navigate(['profile']);
    });
  }

  login(e: Event) {
    e.preventDefault();
    const email = ((e.target as HTMLFormElement)[0] as HTMLInputElement).value;
    const password = ((e.target as HTMLFormElement)[1] as HTMLInputElement).value;

    this.classroomService.login(email, password).then(u => {
      if (u) this.router.navigate(['profile']);
    });
  }
}
