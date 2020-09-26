import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassroomService } from '../service/classroom-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(
    private classroomService: ClassroomService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.classroomService.hasLogin().then(res => {
      if (res) this.router.navigate(['profile']);
    });
  }

  navigate(nav: string) {
    this.router.navigate([nav]);
  }
}
