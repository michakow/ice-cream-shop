import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { switchMap, tap } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientListComponent implements OnInit {
  constructor(private authService: AuthService, private db: AngularFirestore) {}

  ngOnInit(): void {}

  addUser() {
    this.authService
      .createUser('alan.palot@icecream.com', 'zaq1@WSX')
      .pipe(
        switchMap((user) =>
          this.db.doc<User>(`users/${user.user!.uid}`).set(
            {
              uid: user.user!.uid,
              email: 'alan.palot@icecream.com',
              displayName: 'Alan Palot',
              role: 'user',
              favoriteFlavors: ['czekolada'],
            },
            { merge: true }
          )
        )
      )
      .subscribe();
  }

  getUsers() {
    this.db.collection('users').valueChanges().subscribe(console.log);
  }
}
