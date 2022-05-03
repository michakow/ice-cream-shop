import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../models/user.model';
import { UserService } from '../user.service';
import { FormLoginService } from './form-login.service';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPanelComponent implements OnInit {
  loginForm!: FormGroup;
  badLoginData: boolean = false;
  user$!: Observable<boolean>;

  constructor(
    public userService: UserService,
    private formLoginService: FormLoginService
  ) {}

  ngOnInit(): void {
    this.user$ = this.userService.auth$;
    this.loginForm = this.formLoginService.createForm();
  }

  submit() {
    this.loginForm.markAllAsTouched();
    const { login, password } = this.loginForm.value;
    if (this.loginForm.invalid) return;
    this.userService
      .signIn(login, password)
      .pipe(
        tap((res) => {
          if (res.error === 'Zły login lub hasło.') {
            this.badLoginData = true;
          }
        })
      )
      .subscribe((res) => {
        if (res.error === null) {
          this.userService.setUserData(res.res.user!.uid);
          console.log('log in');
        }
      });
  }

  logout() {
    console.log('log out');
    this.userService.logOut().subscribe(console.log);
  }
}
