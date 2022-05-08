import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, switchMap, take } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ClientListService {
  constructor(private authService: AuthService, private db: AngularFirestore) {}

  addUser(firstName: string, lastName: string) {
    const email = `${firstName}.${lastName}@icecream.com`.toLowerCase();
    const displayName = `${firstName} ${lastName}`;
    this.authService
      .createUser(email, 'zaq1@WSX')
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
  }

  getClients() {
    return this.db
      .collection<User>('users')
      .valueChanges()
      .pipe(map((users) => users.filter((user) => user.role !== 'admin')));
  }
}
