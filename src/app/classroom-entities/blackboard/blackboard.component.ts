import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-blackboard',
  templateUrl: './blackboard.component.html',
  styleUrls: ['./blackboard.component.sass']
})
export class BlackboardComponent implements OnInit {
  @Input('isVertical') isVertical: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
