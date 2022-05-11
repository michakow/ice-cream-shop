import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, map, switchMap, tap } from 'rxjs';
import { AuthService } from '../auth.service';
import { FormCreatorService } from '../form-creator.service';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ClientListService {
  private userList: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(
    private authService: AuthService,
    private db: AngularFirestore,
    private formCreatorService: FormCreatorService,
    private toast: ToastrService
  ) {}

  public addUser(firstName: string, lastName: string) {
    const formatFN = firstName.trim();
    const formatLN = lastName.trim();
    if (formatFN === '' || formatLN === '') {
      this.toast.error('Nie podano danych klienta', 'Błędne dane');
      return;
    }
    const email = `${formatFN}.${formatLN}@icecream.com`.toLowerCase();
    if (this.checkIfUserExist(email)) {
      this.toast.error('Klient o takich danych istnieje', 'Klient istnieje');
      return;
    }
    const displayName = `${formatFN} ${formatLN}`;
    this.authService
      .createUser(email, environment.defaultPassword)
      .pipe(
        switchMap((user) =>
          this.db.doc<User>(`users/${user.user!.uid}`).set(
            {
              uid: user.user!.uid,
              email: email,
              displayName: displayName,
              role: 'user',
              favoriteFlavors: [],
              lastOrder: {
                date: '',
                orderID: '',
              },
            },
            { merge: true }
          )
        )
      )
      .subscribe();
    this.toast.success('Dodano nowego klienta', 'Klient dodany');
  }

  public getClients() {
    return this.db
      .collection<User>('users')
      .valueChanges()
      .pipe(
        map((users) => users.filter((user) => user.role !== 'admin')),
        tap((users) => this.userList.next(users))
      );
  }

  public checkIfUserExist(email: string) {
    let result = false;
    this.userList.getValue().forEach((user) => {
      if (user.email === email) {
        result = true;
      }
    });
    return result;
  }

  public createForm() {
    return this.formCreatorService.createClientForm();
  }
}
