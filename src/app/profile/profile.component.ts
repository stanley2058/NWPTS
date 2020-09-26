import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassroomService } from '../service/classroom-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  constructor(
    private classroomService: ClassroomService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.classroomService.hasLogin().then(res => {
      if (!res) this.router.navigate(['']);
    });
  }

  updatePassword(e: Event) {
    e.preventDefault();
  }

  createTaAccount(e: Event) {
    e.preventDefault();
  }

  createNewSession(e: Event) {
    e.preventDefault();
  }
}
