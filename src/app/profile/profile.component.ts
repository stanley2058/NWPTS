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
  scoreQueried = false;
  queryFlattenOption = false;
  queryResultList: {id: string, score: number, date?: string}[];

  loading = false;

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

  queryAction(flatten: boolean = false) {
    this.loading = true;
    this.scoreQueried = false;
    this.queryFlattenOption = flatten;
    const promise = flatten ? this.getFlatScoreResult() : this.queryCourseResult();
    promise.then(res => {
      this.queryResultList = res;
      this.scoreQueried = true;
      this.loading = false;
    });
  }

  queryCourseResult() {
    const dateS = new Date((document.getElementById('dateS') as HTMLInputElement).value);
    const dataF = new Date((document.getElementById('dateF') as HTMLInputElement).value);

    const processList: {id: string, score: number, date: string}[] = [];
    return new Promise<{id: string, score: number, date: string}[]>(resolve => {
      this.classroomService.getHistorySessionRecord(dateS, dataF).then(res => {
        res.forEach(s => {
          const tmpMap = {};
          s.studentRecords.forEach(r => {
            if (tmpMap[r.idNumber]) tmpMap[r.idNumber] += r.record;
            else tmpMap[r.idNumber] = r.record;
          });
          Object.keys(tmpMap).forEach(e => processList.push({
            id: e,
            score: tmpMap[e] > s.questionNum ? s.questionNum : tmpMap[e],
            date: (s.fromTime.toDate() as Date).toLocaleDateString()
          }));
          resolve(processList);
        });
      });

    });
  }

  getFlatScoreResult() {
    const processList: {id: string, score: number}[] = [];
    const tmpMap = {};
    return new Promise<{id: string, score: number}[]>(resolve => {
      this.queryCourseResult().then(result => {
        result.forEach(entry => {
          if (tmpMap[entry.id]) tmpMap[entry.id] += entry.score;
          else tmpMap[entry.id] = entry.score;
        });
        Object.keys(tmpMap).forEach(k => processList.push({
          id: k,
          score: tmpMap[k]
        }));
        resolve(processList);
      });
    });
  }

  showDialog(message: string, success: boolean) {
    if (success) {
      this.dialog.open(ConfirmDialogComponent, {
        width: '350px',
        height: '200px',
        data: {
          text: message,
          confirmOnly: true,
          infoDialog: true
        }
      });
    } else {
      this.dialog.open(ConfirmDialogComponent, {
        width: '350px',
        height: '250px',
        data: {
          text: message,
          confirmOnly: true
        }
      });
    }
  }
}
