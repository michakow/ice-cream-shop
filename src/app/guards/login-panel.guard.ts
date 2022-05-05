import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginPanelGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.userService.isAuth().pipe(
      map((isAuth) => {
        if (!isAuth) return true;
        else {
          this.router.navigate(['home']);
          return false;
        }
      })
    );
  }
}
