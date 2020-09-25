import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spacer',
  templateUrl: './spacer.component.html',
  styleUrls: ['./spacer.component.sass']
})
export class SpacerComponent implements OnInit {
  @Input('isVertical') isVertical: boolean = false;
  @Input('isInTable') isInTable: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
