import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { AuthService } from '../auth.service';
import { Unit } from '../models/unit.model';

@Injectable({
  providedIn: 'root',
})
export class UnitListService {
  constructor(private authService: AuthService, private db: AngularFirestore) {}

  addUnit(unitValue: number) {
    const docID = this.generateDocID(28);
    this.db.doc<Unit>(`units/${docID}`).set(
      {
        value: unitValue,
        unitName: 'ml',
      },
      { merge: true }
    );
  }

  getUnits() {
    return this.db
      .collection<Unit>('units')
      .valueChanges()
      .pipe(map((units) => units.sort((a, b) => a.value - b.value)));
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
