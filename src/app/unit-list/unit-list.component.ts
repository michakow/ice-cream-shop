import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Unit } from '../models/unit.model';
import { FormAddUnitService } from './form-add-unit.service';
import { UnitListService } from './unit-list.service';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitListComponent implements OnInit {
  unitList$!: Observable<Unit[]>;
  addUnitForm!: FormGroup;

  constructor(
    private unitListService: UnitListService,
    private formAddUnitService: FormAddUnitService
  ) {}

  ngOnInit(): void {
    this.unitList$ = this.unitListService.getUnits();
    this.addUnitForm = this.formAddUnitService.createForm();
  }

  submit() {
    this.addUnitForm.markAllAsTouched();
    const { unitValue } = this.addUnitForm.value;
    if (this.addUnitForm.invalid) return;
    this.unitListService.addUnit(unitValue);
    this.addUnitForm.reset();
    this.addUnitForm.controls['unitValue'].setErrors(null);
  }
}
