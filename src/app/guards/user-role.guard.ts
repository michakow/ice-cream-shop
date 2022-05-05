import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root',
})
export class UserRoleGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.userService.getUserRole().pipe(
      map((role) => {
        if (role === 'user') return true;
        else {
          this.router.navigate(['home']);
          return false;
        }
      })
    );
  }
}
