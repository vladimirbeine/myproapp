import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc, DocumentReference } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';
import { uploadString } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage
  ) {}

  getUserProfile() {
      const userDocumentReference: DocumentReference = doc(this.firestore, `/users/${this.auth.currentUser.uid}`);
      console.log("User profile : ", userDocumentReference);
      return docData(userDocumentReference, { idField: 'id' });
  }

  async uploadProfilePicture(cameraFile: Photo) {
    const user = this.auth.currentUser;
    const path = `uploads/${user.uid}/profile.png`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String, 'base64');
      const imageUrl = await getDownloadURL(storageRef);
      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(userDocRef, {
        imageUrl,
      });
      console.log("Image URL: ", imageUrl);
      return true;
    } catch (e) {
      return null;
    }
  }
}
