import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Classroom } from '../classroom-define/Classroom';
import { Classroom201 } from '../classroom-define/Classroom201';
import { Classroom203 } from '../classroom-define/Classroom203';
import { ClassroomRendererComponent } from '../classroom-renderer/classroom-renderer.component';
import { ClassroomObject } from '../ClassroomObject';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ManualInsertDialogComponent } from '../manual-insert-dialog/manual-insert-dialog.component';
import { ClassroomService } from '../service/classroom-service.service';

@Component({
  selector: 'app-classroom-manage',
  templateUrl: './classroom-manage.component.html',
  styleUrls: ['./classroom-manage.component.sass']
})
export class ClassroomManageComponent implements OnInit, OnDestroy {
  @ViewChild(ClassroomRendererComponent) classroomRef: ClassroomRendererComponent;
  classrooms: Classroom[] = [new Classroom203(), new Classroom201()];
  classroomSelected: string;
  
  currentSession: ClassroomObject;
  currentSessionSub: Subscription;
  currentSessionId: string;

  currentScore: number = 0;
  scoreSelection: number[] = [];

  currentStudentIdNumber: string;

  constructor(
    private classroomService: ClassroomService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.classroomService.hasLogin().then(res => {
      if (!res) this.router.navigate(['']);
    });

    if (localStorage['classroom']) this.classroomSelected = localStorage['classroom'];
    else this.classroomSelected = this.classrooms[0].Layout.id;

    this.classroomService.getActivateClassroomSession().then(res => {
      this.currentSessionId = res.id;
      this.currentSession = res.data();
      this.scoreSelection = Array(this.currentSession.questionNum + 1).fill(0).map((x,i) => i);
      this.updateCellId();

      this.currentSessionSub = this.classroomService.getSessionObservable(this.currentSessionId).subscribe(
        update => {
          this.currentSession = update;
          this.scoreSelection = Array(this.currentSession.questionNum + 1).fill(0).map((x,i) => i);
          if (this.currentSession.waitingQueue.length === 0) this.router.navigate(['classroom/ta']);
          this.updateCellId();
        }
      );
    });
  }

  ngOnDestroy() {
    if (this.currentSessionSub) this.currentSessionSub.unsubscribe();
  }

  classroomSelectionChanged() {
    localStorage['classroom'] = this.classroomSelected;
    this.updateCellId();
  }

  updateCellId() {
    if (this.classroomRef && this.currentSession && this.currentSession.waitingQueue && this.currentSession.waitingQueue.length > 0) {
      const sorted = [...this.currentSession.waitingQueue].filter(c => c.roomId === this.classroomSelected).sort((a,b) => a.timeInNumber - b.timeInNumber);
      this.currentStudentIdNumber = sorted[0].idNumber;
      if (this.classroomSelected === sorted[0].roomId)
        this.classroomRef.selectedCellId = sorted[0].cellId;
      else this.classroomRef.selectedCellId = null;
    } else if (this.classroomRef) this.classroomRef.selectedCellId = null;
  }

  submit() {
    this.currentSession.waitingQueue = this.currentSession.waitingQueue.filter(e => 
      e.roomId !== this.classroom.Layout.id ||
      e.cellId !== this.classroomRef.selectedCellId ||
      e.idNumber !== this.currentStudentIdNumber
    );
    this.currentSession.studentRecords.push({
      record: this.currentScore,
      idNumber: this.currentStudentIdNumber
    });
    this.classroomService.updateClassroomObject(this.currentSessionId, this.currentSession).then(res => {
      this.dialog.open(ConfirmDialogComponent, {
        width: '350px',
        height: '200px',
        data: {
          text: "登記完成！",
          confirmOnly: true,
          infoDialog: true
        }
      });
    });
  }

  manual() {
    this.dialog.open(ManualInsertDialogComponent, {
      width: '350px',
      height: '300px',
      data: {
        currentSession: this.currentSession,
        currentSessionId: this.currentSessionId
      }
    });
  }

  get classroom() {
    return this.classrooms.filter(c => c.Layout.id === this.classroomSelected)[0];
  }

  get numberInQueue() {
    if (!this.currentSession) return 0;
    const queue = this.currentSession.waitingQueue.filter(c => c.roomId === this.classroomSelected);
    return queue.length;
  }
}
