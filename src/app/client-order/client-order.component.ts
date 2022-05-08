import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FlavorListClientService } from '../flavor-list-client/flavor-list-client.service';
import { Flavor } from '../models/flavor.model';
import { Unit } from '../models/unit.model';
import { UserService } from '../user.service';
import { ClientOrderService } from './client-order.service';

@Component({
  selector: 'app-client-order',
  templateUrl: './client-order.component.html',
  styleUrls: ['./client-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientOrderComponent implements OnInit {
  favoriteListSelected: boolean = true;
  favoriteList$!: Observable<string[]>;
  flavorList$!: Observable<Flavor[]>;
  orderForm!: FormGroup;
  unitList$!: Observable<Unit[]>;
  userName$!: Observable<string>;

  constructor(
    private userSerivce: UserService,
    private flavorListClientService: FlavorListClientService,
    private clientOrderService: ClientOrderService,
    private formBuilder: FormBuilder
  ) {}

  get orderFormArray() {
    return this.orderForm.controls['order'] as FormArray;
  }

  get orderFormGroup() {
    return this.orderFormArray.controls as FormGroup[];
  }

  ngOnInit(): void {
    this.favoriteList$ = this.userSerivce.getUserFavoriteFlavors();
    this.flavorList$ = this.flavorListClientService.getFlavors();
    this.orderForm = this.clientOrderService.createForm();
    this.unitList$ = this.clientOrderService.getUnits();
    this.userName$ = this.userSerivce.getUserName();
  }

  changeFlavorList() {
    this.favoriteListSelected = !this.favoriteListSelected;
  }

  addFlavorToOrder(flavor: string) {
    this.addNextFlavor(flavor);
  }

  addNextFlavor(flavor: string): void {
    this.orderFormArray.push(
      new FormGroup({
        flavor: this.formBuilder.control(flavor),
        unit: this.formBuilder.control('', [Validators.required]),
        amount: this.formBuilder.control('', [Validators.required]),
      })
    );
  }

  removeFlavor(index: number): void {
    this.orderFormArray.removeAt(index);
  }

  onSubmit(userName: string): void {
    this.orderForm.markAllAsTouched();
    if (this.orderForm.invalid) return;
    console.log(this.orderForm.value, userName);
    this.clientOrderService.sendOrder(this.orderForm.value, userName);
  }
}
