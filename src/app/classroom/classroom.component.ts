import { Component, OnInit } from '@angular/core';
import { Classroom } from '../classroom-define/Classroom';
import { Classroom201 } from '../classroom-define/Classroom201';
import { Classroom203 } from '../classroom-define/Classroom203';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.sass']
})
export class ClassroomComponent implements OnInit {
  classrooms: Classroom[] = [new Classroom203(), new Classroom201()];
  classroomSelected: string;
  isCalling: boolean;
  waitingNumber = 0;

  constructor() { }

  ngOnInit(): void {
    this.classroomSelected = this.classrooms[0].Layout.id;
  }

  get classroom() {
    return this.classrooms.filter(c => c.Layout.id === this.classroomSelected)[0];
  }
}
