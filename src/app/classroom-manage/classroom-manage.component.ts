import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Classroom } from '../classroom-define/Classroom';
import { Classroom201 } from '../classroom-define/Classroom201';
import { Classroom203 } from '../classroom-define/Classroom203';
import { ClassroomRendererComponent } from '../classroom-renderer/classroom-renderer.component';
import { ClassroomService } from '../service/classroom-service.service';

@Component({
  selector: 'app-classroom-manage',
  templateUrl: './classroom-manage.component.html',
  styleUrls: ['./classroom-manage.component.sass']
})
export class ClassroomManageComponent implements OnInit {
  @ViewChild(ClassroomRendererComponent) classroomRef: ClassroomRendererComponent;
  classrooms: Classroom[] = [new Classroom203(), new Classroom201()];
  classroomSelected: string;
  sessionId: string;
  waitingNumber = 0;

  constructor(
    private classroomService: ClassroomService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.params['sid'];
    this.classroomService.hasLogin().then(res => {
      if (!res) this.router.navigate(['']);
    });
  }

}
