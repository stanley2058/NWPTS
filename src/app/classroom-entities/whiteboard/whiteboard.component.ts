import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.sass']
})
export class WhiteboardComponent implements OnInit {
  @Input('isVertical') isVertical: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
