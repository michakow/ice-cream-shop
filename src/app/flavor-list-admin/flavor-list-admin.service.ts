import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../auth.service';
import { Flavor } from '../models/flavor.model';

@Injectable({
  providedIn: 'root',
})
export class FlavorListAdminService {
  constructor(private authService: AuthService, private db: AngularFirestore) {}

  addFlavor(name: string) {
    const docID = this.generateDocID(28);
    this.db.doc<Flavor>(`icecreams/${docID}`).set(
      {
        name: name,
      },
      { merge: true }
    );
  }

  getFlavors() {
    return this.db.collection<Flavor>('icecreams').valueChanges();
  }

  generateDocID(length: number) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
