import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassroomService } from '../service/classroom-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  hasLogin: boolean

  constructor(private router: Router, private classroomService: ClassroomService) { }

  ngOnInit(): void {
    this.classroomService.hasLogin().then(res => this.hasLogin = res);
  }

  navigate(nav: string) {
    this.router.navigate([nav]);
  }

  logout() {
    this.classroomService.logout();
    this.router.navigate(['']);
  }
}
