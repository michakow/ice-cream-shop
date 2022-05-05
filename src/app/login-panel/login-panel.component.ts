import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
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

  constructor(
    public userService: UserService,
    private formLoginService: FormLoginService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
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
            this.cdr.detectChanges();
          }
        })
      )
      .subscribe((res) => {
        if (res.error === null) {
          this.userService.setUserID(res.res.user!.uid);
          this.router.navigate(['home']);
        }
      });
  }
}
