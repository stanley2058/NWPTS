import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-door',
  templateUrl: './door.component.html',
  styleUrls: ['./door.component.sass']
})
export class DoorComponent implements OnInit {
  @Input('isVertical') isVertical: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
