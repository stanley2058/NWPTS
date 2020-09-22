import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.sass']
})
export class ClassroomComponent implements OnInit {
  classroomSelected = '203';
  isCalling: boolean;
  waitingNumber = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
