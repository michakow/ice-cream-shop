import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map, tap } from 'rxjs';
import { FormCreatorService } from '../form-creator.service';
import { Unit } from '../models/unit.model';

@Injectable({
  providedIn: 'root',
})
export class UnitListService {
  private unitList: BehaviorSubject<Unit[]> = new BehaviorSubject<Unit[]>([]);

  constructor(
    private db: AngularFirestore,
    private formCreatorService: FormCreatorService,
    private toast: ToastrService
  ) {}

  public addUnit(unitValue: number) {
    const docID = this.generateDocID(28);
    if (this.checkIfUnitExist(unitValue)) {
      this.toast.error(
        'Pojemność o takim rozmiarze istnieje',
        'Pojemność istnieje'
      );
      return;
    }
    this.db.doc<Unit>(`units/${docID}`).set(
      {
        value: unitValue,
        unitName: 'ml',
      },
      { merge: true }
    );
    this.toast.success('Dodano nową pojemność', 'Pojemność dodana');
  }

  public getUnits() {
    return this.db
      .collection<Unit>('units')
      .valueChanges()
      .pipe(
        map((units) => units.sort((a, b) => a.value - b.value)),
        tap((units) => this.unitList.next(units))
      );
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

  public checkIfUnitExist(value: number) {
    let result = false;
    this.unitList.getValue().forEach((unit) => {
      if (unit.value === value) {
        result = true;
      }
    });
    return result;
  }

  public createForm() {
    return this.formCreatorService.createUnitForm();
  }
}
