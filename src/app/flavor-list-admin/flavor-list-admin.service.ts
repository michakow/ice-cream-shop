import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, tap } from 'rxjs';
import { FormCreatorService } from '../form-creator.service';
import { Flavor } from '../models/flavor.model';

@Injectable({
  providedIn: 'root',
})
export class FlavorListAdminService {
  private flavorList: BehaviorSubject<Flavor[]> = new BehaviorSubject<Flavor[]>(
    []
  );

  constructor(
    private db: AngularFirestore,
    private formCreatorService: FormCreatorService,
    private toast: ToastrService
  ) {}

  addFlavor(name: string) {
    const docID = this.generateDocID(28);
    const formatName = name.trim();
    if (formatName === '') {
      this.toast.error('Nie podano żadnego smaku', 'Błędne dane');
      return;
    }
    if (this.checkIfFlavorExist(formatName.toLowerCase())) {
      this.toast.error('Smak o takiej nazwie istnieje', 'Smak istnieje');
      return;
    }
    this.db.doc<Flavor>(`icecreams/${docID}`).set(
      {
        id: docID,
        name: formatName,
      },
      { merge: true }
    );
    this.toast.success('Dodano nowy smak', 'Smak dodany');
  }

  deleteFlavor(id: string) {
    this.db.doc<Flavor>(`icecreams/${id}`).delete();
  }

  getFlavors() {
    return this.db
      .collection<Flavor>('icecreams')
      .valueChanges()
      .pipe(tap((flavors) => this.flavorList.next(flavors)));
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

  public checkIfFlavorExist(name: string) {
    let result = false;
    this.flavorList.getValue().forEach((flavor) => {
      if (flavor.name === name) {
        result = true;
      }
    });
    return result;
  }

  public createForm() {
    return this.formCreatorService.createFlavorForm();
  }
}
