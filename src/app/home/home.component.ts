import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from '../user.service';

export interface NavItem {
  route: string;
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  role$!: Observable<string>;
  user$!: Observable<User | undefined>;
  adminNav: NavItem[] = [
    { route: 'clients', name: 'Lista klientów' },
    { route: 'flavors', name: 'Lista smaków' },
    { route: 'orders', name: 'Lista zamówień' },
  ];
  clientNav: NavItem[] = [
    { route: 'flavors', name: 'Lista smaków' },
    { route: 'order', name: 'Złóż zamówienie' },
  ];
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.user$ = this.userService.setUserData();
    this.role$ = this.userService.getUserRole();
  }

  nav() {
    this.router.navigate(['home', 'client']);
  }
}
