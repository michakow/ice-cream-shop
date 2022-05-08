import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Flavor } from '../models/flavor.model';
import { FlavorListAdminService } from './flavor-list-admin.service';
import { FormAddFlavorService } from './form-add-flavor.service';

@Component({
  selector: 'app-flavor-list-admin',
  templateUrl: './flavor-list-admin.component.html',
  styleUrls: ['./flavor-list-admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlavorListAdminComponent implements OnInit {
  flavorList$!: Observable<Flavor[]>;
  addFlavorForm!: FormGroup;

  constructor(
    private flavorListService: FlavorListAdminService,
    private formAddFlavorService: FormAddFlavorService
  ) {}

  ngOnInit(): void {
    this.flavorList$ = this.flavorListService.getFlavors();
    this.addFlavorForm = this.formAddFlavorService.createForm();
  }

  submit() {
    this.addFlavorForm.markAllAsTouched();
    const { name } = this.addFlavorForm.value;
    if (this.addFlavorForm.invalid) return;
    this.flavorListService.addFlavor(name);
    this.addFlavorForm.reset();
    this.addFlavorForm.controls['name'].setErrors(null);
  }
}
