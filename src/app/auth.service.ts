import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { from, map, tap } from 'rxjs';
import { User } from './models/user.model';
import { AppState } from './store/app.state';
import { AuthActions } from './store/auth';
import { UserActions } from './store/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private store: Store<AppState>,
    private db: AngularFirestore
  ) {}

  login(username: string, password: string) {
    return from(this.auth.signInWithEmailAndPassword(username, password));
  }

  logout() {
    return from(this.auth.signOut());
  }

  isAuth() {
    return this.auth.authState.pipe(
      tap((user) => {
        if (user) {
          this.store.dispatch(AuthActions.signIn());
          this.db
            .doc<User>(`users/${user.uid}`)
            .valueChanges()
            .subscribe((data) => {
              if (data)
                this.store.dispatch(
                  UserActions.setUser({
                    uid: data.uid,
                    displayName: data.displayName,
                    email: data.email,
                    role: data.role,
                    favoriteFlavors: data.favoriteFlavors,
                  })
                );
            });
        } else this.store.dispatch(AuthActions.signOut());
      }),
      map((user) => {
        if (user) return true;
        else return false;
      })
    );
  }
}
