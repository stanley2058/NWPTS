import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.sass']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {text?: string, confirmOnly?: boolean, infoDialog?: boolean}) { }

  ngOnInit(): void {
    if (!this.data) this.data = {};
    if (!this.data.text) this.data.text = "尚未被保存的資料會遺失，確定要取消？";
  }

}
