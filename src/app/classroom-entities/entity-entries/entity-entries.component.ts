import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-entity-entries',
  templateUrl: './entity-entries.component.html',
  styleUrls: ['./entity-entries.component.sass']
})
export class EntityEntriesComponent implements OnInit {
  @Input('entry') entry: string;

  constructor() { }

  ngOnInit(): void {
  }

}
