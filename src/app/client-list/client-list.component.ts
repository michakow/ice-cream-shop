import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { ClientListService } from './client-list.service';
import { FormAddClientService } from './form-add-client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientListComponent implements OnInit {
  userList$!: Observable<User[]>;
  addClientForm!: FormGroup;

  constructor(
    private clientListService: ClientListService,
    private formAddClientService: FormAddClientService
  ) {}

  ngOnInit(): void {
    this.userList$ = this.clientListService.getClients();
    this.addClientForm = this.formAddClientService.createForm();
  }

  submit() {
    this.addClientForm.markAllAsTouched();
    const { firstName, lastName } = this.addClientForm.value;
    if (this.addClientForm.invalid) return;
    this.clientListService.addUser(firstName, lastName);
    this.addClientForm.reset();
    this.addClientForm.controls['firstName'].setErrors(null);
    this.addClientForm.controls['lastName'].setErrors(null);
  }
}
