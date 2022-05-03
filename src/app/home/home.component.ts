import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  username$!: Observable<string>;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.username$ = this.userService.getUserName();
  }

  logout() {
    this.userService.logOut().subscribe(() => this.router.navigate(['login']));
  }
}
