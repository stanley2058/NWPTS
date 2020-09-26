import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClassroomObject } from '../ClassroomObject';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ClassroomService } from '../service/classroom-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  constructor(
    private classroomService: ClassroomService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.classroomService.hasLogin().then(res => {
      if (!res) this.router.navigate(['']);
    });
  }

  updatePassword(e: Event) {
    e.preventDefault();
    const password = ((e.target as HTMLFormElement).elements.item(0) as HTMLInputElement);
    this.classroomService.updatePassword(password.value).then(res => {
      password.value = '';
      this.showDialog("變更成功！", true);
    }).catch(error => {
      this.showDialog(`發生錯誤：${error}`, false);
    });
  }

  createTaAccount(e: Event) {
    e.preventDefault();
    const email = ((e.target as HTMLFormElement).elements.item(0) as HTMLInputElement);
    this.classroomService.createNewUser(email.value, 'soselab401').then(res => {
      email.value = '';
      this.showDialog("新增成功！", true);
    }).catch(error => {
      this.showDialog(`發生錯誤：${error}`, false);
    });
  }

  createNewSession(e: Event) {
    e.preventDefault();
    const inputList = Array.from((e.target as HTMLFormElement).elements).filter(e => e.tagName.toLowerCase() === 'input') as HTMLInputElement[];
    const date = inputList[0].value;
    const timeF = inputList[1].value;
    const timeT = inputList[2].value;
    const num = parseInt(inputList[3].value);
    const questionNum = isFinite(num) ? num : 0;

    const sessionObj: ClassroomObject = {
      fromTime: new Date(`${date} ${timeF}`),
      toTime: new Date(`${date} ${timeT}`),
      questionNum: questionNum,
      studentRecords: [],
      waitingQueue: []
    };
    
    this.classroomService.createNewClassSession(sessionObj).then(res => {
      inputList.forEach(e => e.value = null);
      this.showDialog("新增成功！", true);
    }).catch(error => {
      console.error(error);
      this.showDialog(`發生錯誤：${error}`, false);
    });
  }

  queryCourseResult(e: Event) {
    e.preventDefault();
    // TODO: finish querying
  }

  showDialog(message: string, success: boolean) {
    if (success) {
      this.dialog.open(ConfirmDialogComponent, {
        width: '350px',
        height: '300px',
        data: {
          text: message,
          confirmOnly: true,
          infoDialog: true
        }
      });
    } else {
      this.dialog.open(ConfirmDialogComponent, {
        width: '350px',
        height: '300px',
        data: {
          text: message,
          confirmOnly: true
        }
      });
    }
  }
}
