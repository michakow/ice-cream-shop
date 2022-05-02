import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
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
    private authService: AuthServiceService,
    private formLoginService: FormLoginService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formLoginService.createForm();
  }

  login() {
    this.authService
      .login('admin@icecream.com', 'zaq1@WSX')
      .subscribe(console.log);
  }

  submit() {
    this.loginForm.markAllAsTouched();
    const { login, password } = this.loginForm.value;
    if (this.loginForm.invalid) return;
    this.authService.login(login, password).subscribe(console.log);
    this.badLoginData = true;
  }
}
