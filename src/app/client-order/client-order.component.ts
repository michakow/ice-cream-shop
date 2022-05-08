import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { format } from 'date-fns';
import { Observable, tap } from 'rxjs';
import { FlavorListClientService } from '../flavor-list-client/flavor-list-client.service';
import { Flavor } from '../models/flavor.model';
import { Order } from '../models/order.model';
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
  lastOrder$!: Observable<Order | null>;
  showOrder: boolean = true;

  constructor(
    private userSerivce: UserService,
    private flavorListClientService: FlavorListClientService,
    private clientOrderService: ClientOrderService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
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
    this.lastOrder$ = this.clientOrderService.getLastOrder().pipe(
      tap((order) => {
        if (order!.date === format(new Date(), 'yyyy-MM-dd'))
          this.showOrder = false;
      })
    );
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
    this.clientOrderService.sendOrder(this.orderForm.value, userName);
    this.showOrder = false;
    this.cdr.detectChanges();
  }

  sendLastOrder(order: Order) {
    this.clientOrderService.sendLastOrder(order);
    this.showOrder = false;
  }
}
