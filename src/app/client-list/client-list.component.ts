import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { ClientListService } from './client-list.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientListComponent implements OnInit {
  userList$!: Observable<User[]>;
  addClientForm!: FormGroup;
  blockButton: boolean = false;

  constructor(private clientListService: ClientListService) {}

  ngOnInit(): void {
    this.userList$ = this.clientListService.getClients();
    this.addClientForm = this.clientListService.createForm();
  }

  submit() {
    this.blockButton = true;
    this.addClientForm.markAllAsTouched();
    const { firstName, lastName } = this.addClientForm.value;
    this.clientListService.addUser(firstName, lastName);
    this.blockButton = true;
    setTimeout(() => (this.blockButton = false), 1000);
    this.addClientForm.reset();
    this.addClientForm.controls['firstName'].setValue(' ');
    this.addClientForm.controls['lastName'].setValue(' ');
  }

  deleteUser(id: string) {
    this.clientListService.deleteUser(id);
  }
}
