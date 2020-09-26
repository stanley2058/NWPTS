import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore';
import { v4 as uuidv4 } from 'uuid';

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

  createNewClassSession() {
    const sessionId = uuidv4();

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
}
