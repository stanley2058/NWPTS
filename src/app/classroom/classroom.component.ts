import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Classroom } from '../classroom-define/Classroom';
import { Classroom201 } from '../classroom-define/Classroom201';
import { Classroom203 } from '../classroom-define/Classroom203';
import { ClassroomRendererComponent } from '../classroom-renderer/classroom-renderer.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ClassroomService } from '../service/classroom-service.service';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.sass']
})
export class ClassroomComponent implements OnInit, AfterViewInit {
  @ViewChild(ClassroomRendererComponent) classroomRef: ClassroomRendererComponent;
  classrooms: Classroom[] = [new Classroom203(), new Classroom201()];
  classroomSelected: string;
  sessionId: string;
  isCalling: boolean;
  locked: boolean;
  idNumber: string = '';
  waitingNumber = 0;

  constructor(
    private matDialog: MatDialog,
    private route: ActivatedRoute,
    private classroomService: ClassroomService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.params['sid'];
    this.classroomService.hasLogin().then(res => {
      if (res) {
        if (this.sessionId) this.router.navigate([`classroom/ta/${this.sessionId}`]);
        else this.router.navigate(['classroom/ta']);
      }
    });
    
    if (localStorage['classroom']) this.classroomSelected = localStorage['classroom'];
    else this.classroomSelected = this.classrooms[0].Layout.id;
    if (localStorage['idNumber']) this.idNumber = localStorage['idNumber'];
  }

  ngAfterViewInit() {
    if (this.idNumber && this.cellId)
      setTimeout(() => this.lockInfo(), 1);
  }

  get classroom() {
    return this.classrooms.filter(c => c.Layout.id === this.classroomSelected)[0];
  }

  classroomSelectionChanged() {
    localStorage['classroom'] = this.classroomSelected;
  }

  get cellId() {
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
    console.log(this.idNumber, this.cellId, this.classroom.Layout.id);
  }
  
  cancel() {
    
  }
}
