import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';
import { from, map, tap } from 'rxjs';
import { AppState } from './store/app.state';
import { AuthActions } from './store/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth, private store: Store<AppState>) {}

  login(username: string, password: string) {
    return from(this.auth.signInWithEmailAndPassword(username, password));
  }

  logout() {
    return from(this.auth.signOut());
  }

  isAuth() {
    return this.auth.authState.pipe(
      tap((user) => {
        if (user) this.store.dispatch(AuthActions.signIn());
        else this.store.dispatch(AuthActions.signOut());
      }),
      map((user) => {
        if (user) return true;
        else return false;
      })
    );
  }
}
