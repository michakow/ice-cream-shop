import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { FirebaseError } from 'firebase/app';
import { catchError, map, of, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './models/user.model';
import { AppState } from './store/app.state';
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

  public get auth$() {
    return this.store.select((state) => state.auth.isAuth);
  }

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
      })
    );
  }

  logOut() {
    return this.authService.logout().pipe(
      tap(() => {
        this.store.dispatch(UserActions.clearUser());
      })
    );
  }

  setUserData(userID: string) {
    this.db
      .doc<User>(`users/${userID}`)
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
