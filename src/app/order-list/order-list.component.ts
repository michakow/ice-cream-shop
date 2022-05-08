import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { format } from 'date-fns';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { OrderListService, OrderSummary } from './order-list.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListComponent implements OnInit {
  orderList$!: Observable<Order[]>;
  ordersSummary$!: Observable<OrderSummary[]>;

  @ViewChild(MatAccordion) accordion!: MatAccordion;

  constructor(private orderListService: OrderListService) {}

  ngOnInit(): void {
    this.orderList$ = this.orderListService.getOrders();
    this.ordersSummary$ = this.orderListService.getSummary();
  }
}
