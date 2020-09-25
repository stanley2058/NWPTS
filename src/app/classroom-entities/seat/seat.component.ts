import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.sass']
})
export class SeatComponent implements OnInit {
  @Input('isVertical') isVertical: boolean = false;
  @Input('id') id: string;
  @Output('cellSelected') cellSelected = new EventEmitter<string>();
  selected = false;

  constructor() { }

  ngOnInit(): void {
    this.selected = localStorage['currentCellId'] && localStorage['currentCellId'] === this.id;
  }

  select() {
    this.cellSelected.emit(this.id);
  }
}
