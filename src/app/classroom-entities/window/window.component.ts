import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.sass']
})
export class WindowComponent implements OnInit {
  @Input('isVertical') isVertical: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
