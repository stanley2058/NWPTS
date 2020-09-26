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
  @Input('selectedId') selectedId: string;
  selected = false;

  constructor() { }

  ngOnInit(): void {
    this.selected = this.selectedId === this.id;
  }

  select() {
    this.cellSelected.emit(this.id);
  }
}
