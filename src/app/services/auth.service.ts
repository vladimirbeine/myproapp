import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { Firestore, doc } from '@angular/fire/firestore';
import { DocumentReference, setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
    private firestore: Firestore) { }

  signup({email, password}): Promise<void> {
    return createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      ).then (async () => {
        const userDocumentReference: DocumentReference = doc(this.firestore, `/users/${this.auth.currentUser.uid}`);
        await setDoc(userDocumentReference, {
          email,
          password
        });
      }).catch(e => {
        console.log("Error on signup: ", e);
      });
  }

  async login({email, password}) {
    try {
      const user = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user;

    } catch (e) {
      return null;
    }}

  logout() {
    return signOut(this.auth);
  }

}
