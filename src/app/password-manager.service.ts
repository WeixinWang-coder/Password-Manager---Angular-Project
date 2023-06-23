import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class PasswordManagerService {
  constructor(private firestore: Firestore, private auth: Auth) {}
  addSite(data: object) {
    const dbInstance = collection(this.firestore, 'sites');
    return addDoc(dbInstance, data);
  }
  loadSites() {
    const dbInstance = collection(this.firestore, 'sites');
    return collectionData(dbInstance, { idField: 'id' });
  }
  updateSite(id: string, data: object) {
    const docInstance = doc(this.firestore, 'sites', id);
    return updateDoc(docInstance, data);
  }
  deleteSite(id: string) {
    const docInstance = doc(this.firestore, 'sites', id);
    return deleteDoc(docInstance);
  }

  addPassword(data: object, siteId: string) {
    const dbInstance = collection(this.firestore, `sites/${siteId}/passwords`);
    return addDoc(dbInstance, data);
  }

  loadPassword(siteId: string) {
    const dbInstance = collection(this.firestore, `sites/${siteId}/passwords`);
    return collectionData(dbInstance, { idField: 'id' });
  }

  updatePassword(siteId: string, passwordId: string, data: object) {
    const docInstance = doc(
      this.firestore,
      `sites/${siteId}/passwords`,
      passwordId
    );
    return updateDoc(docInstance, data);
  }

  deletePassword(siteId: string, passwordId: string) {
    const docInstance = doc(
      this.firestore,
      `sites/${siteId}/passwords`,
      passwordId
    );
    return deleteDoc(docInstance);
  }

  //password Queries
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
}
