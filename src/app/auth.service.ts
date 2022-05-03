import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';
import { from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  login(username: string, password: string) {
    return from(this.auth.signInWithEmailAndPassword(username, password));
  }

  logout() {
    return from(this.auth.signOut());
  }

  isAuth() {
    return this.auth.authState.pipe(
      map((user) => {
        if (user) return true;
        else return false;
      })
    );
  }
}
