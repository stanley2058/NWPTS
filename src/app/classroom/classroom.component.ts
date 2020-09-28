import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Classroom } from '../classroom-define/Classroom';
import { Classroom201 } from '../classroom-define/Classroom201';
import { Classroom203 } from '../classroom-define/Classroom203';
import { ClassroomRendererComponent } from '../classroom-renderer/classroom-renderer.component';
import { ClassroomObject } from '../ClassroomObject';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ClassroomService } from '../service/classroom-service.service';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.sass']
})
export class ClassroomComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(ClassroomRendererComponent) classroomRef: ClassroomRendererComponent;
  classrooms: Classroom[] = [new Classroom203(), new Classroom201()];
  classroomSelected: string;
  locked: boolean;
  idNumber: string = '';

  currentSession: ClassroomObject;
  currentSessionSub: Subscription;
  currentSessionId: string;

  deadlineTimer: any = null;

  constructor(
    private matDialog: MatDialog,
    private classroomService: ClassroomService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.classroomService.hasLogin().then(res => {
      if (res) this.router.navigate(['classroom/ta']);
    });
    
    if (localStorage['classroom']) this.classroomSelected = localStorage['classroom'];
    else this.classroomSelected = this.classrooms[0].Layout.id;
    if (localStorage['idNumber']) this.idNumber = localStorage['idNumber'];

    this.classroomService.getActivateClassroomSession().then(res => {
      this.deadlineTimer = setInterval(() => this.checkDeadline(), 1000);
      if (res) {
        this.currentSessionId = res.id;
        this.currentSession = res.data();
  
        this.currentSessionSub = this.classroomService.getSessionObservable(this.currentSessionId).subscribe(
          update => {
            this.currentSession = update;
          }
        );
      }
    });
  }

  ngAfterViewInit() {
    if (this.idNumber && this.cellId)
      setTimeout(() => this.lockInfo(), 1);
  }

  ngOnDestroy() {
    if (this.deadlineTimer) clearInterval(this.deadlineTimer);
    if (this.currentSessionSub) this.currentSessionSub.unsubscribe();
  }

  get classroom() {
    return this.classrooms.filter(c => c.Layout.id === this.classroomSelected)[0];
  }

  classroomSelectionChanged() {
    localStorage['classroom'] = this.classroomSelected;
  }

  get cellId(): string {
    return this.classroomRef.selectedCellId || localStorage['currentCellId'];
  }

  lockInfo() {
    let errMsg = "";
    if (!this.idNumber && !this.cellId) errMsg = "請填寫學號並選擇座位！";
    else if (!this.idNumber) errMsg = "請填寫學號！";
    else if (!this.classroomRef.selectedCellId) errMsg = "請選擇座位！";
      
    if (errMsg) {
      this.matDialog.open(ConfirmDialogComponent, {
        width: '300px',
        height: '200px',
        data: {
          text: errMsg,
          confirmOnly: true
        }
      });
    } else {
      localStorage['idNumber'] = this.idNumber;
      this.locked = true;
    }
  }
  unlockInfo() {
    this.locked = false;
  }

  callTA() {
    this.currentSession.waitingQueue.push({
      timeInNumber: this.classroomService.timestamp.getTime(),
      roomId: this.classroom.Layout.id,
      cellId: this.cellId,
      idNumber: this.idNumber
    });
    this.classroomService.updateClassroomObject(this.currentSessionId, this.currentSession);
  }
  
  cancel() {
    this.currentSession.waitingQueue = this.currentSession.waitingQueue.filter(e => 
      e.roomId !== this.classroom.Layout.id ||
      e.cellId !== this.cellId ||
      e.idNumber !== this.idNumber
    );
    this.classroomService.updateClassroomObject(this.currentSessionId, this.currentSession);
  }

  checkDeadline() {
    if (this.currentSession && this.currentSession.toTime.toDate() >= this.classroomService.timestamp) return;
    
    if (this.deadlineTimer) return;
    clearInterval(this.deadlineTimer);

    this.matDialog.open(ConfirmDialogComponent, {
      width: '350px',
      height: '200px',
      data: {
        text: "已超過課程時間，將重新導向首頁。",
        confirmOnly: true
      }
    }).afterClosed().subscribe(
      obs => {
        this.router.navigate(['']);
      }
    );
  }

  get isCalling() {
    return this.currentSession?.waitingQueue?.filter(e => 
      e.roomId === this.classroom.Layout.id &&
      e.cellId === this.cellId &&
      e.idNumber === this.idNumber
    ).length > 0;
  }

  get fromTime() {
    if (this.currentSession) return (this.currentSession.fromTime.toDate() as Date).toLocaleString();
    return '';
  }
  get toTime() {
    if (this.currentSession) return (this.currentSession.toTime.toDate() as Date).toLocaleString();
    return '';
  }
}
