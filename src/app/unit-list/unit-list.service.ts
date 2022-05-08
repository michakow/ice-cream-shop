import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { FormCreatorService } from '../form-creator.service';
import { Unit } from '../models/unit.model';

@Injectable({
  providedIn: 'root',
})
export class UnitListService {
  constructor(
    private db: AngularFirestore,
    private formCreatorService: FormCreatorService
  ) {}

  public addUnit(unitValue: number) {
    const docID = this.generateDocID(28);
    this.db.doc<Unit>(`units/${docID}`).set(
      {
        value: unitValue,
        unitName: 'ml',
      },
      { merge: true }
    );
  }

  public getUnits() {
    return this.db
      .collection<Unit>('units')
      .valueChanges()
      .pipe(map((units) => units.sort((a, b) => a.value - b.value)));
  }

  public generateDocID(length: number) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public createForm() {
    return this.formCreatorService.createUnitForm();
  }
}
