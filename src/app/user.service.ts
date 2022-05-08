import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { FirebaseError } from 'firebase/app';
import { catchError, map, of, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './models/user.model';
import { AppState } from './store/app.state';
import { AuthActions } from './store/auth';
import { UserActions } from './store/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private db: AngularFirestore
  ) {}
  private userID!: string;

  signIn(username: string, password: string) {
    return this.authService.login(username, password).pipe(
      catchError((err: HttpErrorResponse | FirebaseError) => of(err)),
      map((res) => {
        if (res instanceof HttpErrorResponse) {
          return {
            error: 'Nie można połączyć się z serwerem.',
            res: null,
          };
        } else if (res instanceof FirebaseError) {
          return {
            error: 'Zły login lub hasło.',
            res: null,
          };
        } else {
          return {
            error: null,
            res: res,
          };
        }
      }),
      tap((res) => {
        if (res.error === null) {
          this.store.dispatch(AuthActions.signIn());
        }
      })
    );
  }

  logOut() {
    return this.authService.logout().pipe(
      tap(() => {
        this.store.dispatch(AuthActions.signOut());
        this.store.dispatch(UserActions.clearUser());
      })
    );
  }

  setUserData() {
    return this.db
      .doc<User>(`users/${this.userID}`)
      .valueChanges()
      .pipe(
        tap((data) => {
          if (data)
            this.store.dispatch(
              UserActions.setUser({
                uid: data.uid,
                displayName: data.displayName,
                email: data.email,
                role: data.role,
                favoriteFlavors: data.favoriteFlavors,
                lastOrder: data.lastOrder,
              })
            );
        })
      );
  }

  isAuth() {
    return this.store.select((state) => state.auth.isAuth);
  }

  getUserID() {
    return this.userID;
  }

  setUserID(id: string) {
    this.userID = id;
  }

  getUserName() {
    return this.store.select((state) => state.user.displayName);
  }

  getUserRole() {
    return this.store.select((state) => state.user.role);
  }

  getUserFavoriteFlavors() {
    return this.store.select((state) => state.user.favoriteFlavors);
  }
}
