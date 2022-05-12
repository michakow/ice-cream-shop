import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Unit } from '../models/unit.model';
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
  blockButton: boolean = false;

  constructor(private unitListService: UnitListService) {}

  ngOnInit(): void {
    this.unitList$ = this.unitListService.getUnits();
    this.addUnitForm = this.unitListService.createForm();
  }

  submit() {
    this.blockButton = true;
    this.addUnitForm.markAllAsTouched();
    const { unitValue } = this.addUnitForm.value;
    if (this.addUnitForm.invalid) return;
    setTimeout(() => (this.blockButton = false), 1000);
    this.unitListService.addUnit(unitValue);
    this.addUnitForm.reset();
    this.addUnitForm.controls['unitValue'].setValue(1);
  }

  deleteUnit(id: string) {
    this.unitListService.deleteUnit(id);
  }
}
