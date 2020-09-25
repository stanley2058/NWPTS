import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-entity-entries',
  templateUrl: './entity-entries.component.html',
  styleUrls: ['./entity-entries.component.sass']
})
export class EntityEntriesComponent implements OnInit {
  @Input('entry') entry: string;
  @Input('isVertical') isVertical: boolean = false;
  @Input('id') id: string = null;
  @Input('isInTable') isInTable: boolean = false;
  @Output('cellSelected') cellSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  cellSelectionChanged(id: string) {
    this.cellSelected.emit(id);
  }
}
