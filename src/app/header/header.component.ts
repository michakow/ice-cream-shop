import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  appName: string = 'Ice cream shop';
  username$!: Observable<string>;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.username$ = this.userService.getUserName();
  }

  logout() {
    this.userService.logOut().subscribe(() => this.router.navigate(['login']));
  }
}
