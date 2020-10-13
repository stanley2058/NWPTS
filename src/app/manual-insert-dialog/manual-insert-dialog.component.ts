import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClassroomObject } from '../ClassroomObject';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ClassroomService } from '../service/classroom-service.service';

@Component({
  selector: 'app-manual-insert-dialog',
  templateUrl: './manual-insert-dialog.component.html',
  styleUrls: ['./manual-insert-dialog.component.sass']
})
export class ManualInsertDialogComponent implements OnInit {
  scoreSelection: number[];
  currentScore = 0;
  loading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {currentSession: ClassroomObject, currentSessionId: string},
    private dialogRef: MatDialogRef<ManualInsertDialogComponent>,
    private classroomService: ClassroomService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.scoreSelection = Array(this.data.currentSession.questionNum + 1).fill(0).map((x,i) => i);
  }

  submit() {
    this.loading = true;
    this.data.currentSession.studentRecords.push({
      record: this.currentScore,
      idNumber: (document.getElementById('idNumber') as HTMLInputElement).value
    });
    this.classroomService.updateClassroomObject(this.data.currentSessionId, this.data.currentSession).then(res => {
      this.dialog.open(ConfirmDialogComponent, {
        width: '350px',
        height: '200px',
        data: {
          text: "登記完成！",
          confirmOnly: true,
          infoDialog: true
        }
      }).afterClosed().subscribe(n => {
        this.loading = false;
        this.dialogRef.close();
      });
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
