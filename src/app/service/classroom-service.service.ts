import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore, DocumentData } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { ClassroomObject } from '../ClassroomObject';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) { }

  callTA(roomId: string, cellId: string, id: string) {

  }
  cancelCallTA(roomId: string, cellId: string, id: string) {

  }

  getClassInfo(sid: string) {

  }

  createNewClassSession(data: ClassroomObject) {
    return this.firestore.collection<ClassroomObject>('classroom-session').add(data);
  }

  getActivateClassroomSession() {
    return new Promise<DocumentData>(res => {
      this.firestore.collection<ClassroomObject>('classroom-session',
        ref => ref.where('toTime', '>=', this.timestamp)
      ).get().subscribe(
        result => {
          res(result.docs.filter(d => (d.data() as ClassroomObject).fromTime <= this.timestamp)[0]);
        }
      );
    });
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  updatePassword(newPassword: string) {
    return new Promise((res, rej) => {
      this.currentUser().then(u => {
        u.updatePassword(newPassword)
          .then(() => res())
          .catch(err => rej(err));
      });
    });
  }

  currentUser() {
    return this.auth.currentUser;
  }

  createNewUser(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  hasLogin() {
    return new Promise<boolean>(res => this.auth.onAuthStateChanged(
      user => {
        res(!!user);
      }
    ));
  }

  get timestamp() {
    return firebase.firestore.Timestamp.now().toDate();
  }
}
