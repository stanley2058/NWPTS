import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.sass']
})
export class TeacherComponent implements OnInit {
  @Input('isVertical') isVertical: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
