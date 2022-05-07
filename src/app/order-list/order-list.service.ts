import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Order } from '../models/order.model';
import { format } from 'date-fns';

export interface OrderSummary {
  flavor: string;
  amount: number;
}

@Injectable({
  providedIn: 'root',
})
export class OrderListService {
  constructor(private db: AngularFirestore) {}

  getOrders() {
    return this.db
      .collection<Order>('orders')
      .valueChanges()
      .pipe(
        map((orders) =>
          orders.filter(
            (order) => order.date === format(new Date(), 'yyyy-MM-dd')
          )
        )
      );
  }

  getSummary() {
    return this.db
      .collection<Order>('orders')
      .valueChanges()
      .pipe(
        map((orders) =>
          orders.filter(
            (order) => order.date === format(new Date(), 'yyyy-MM-dd')
          )
        ),
        map((orders) => {
          //count amount of ice cream flavors from one order
          return orders
            .map((clientOrder) => {
              return clientOrder.order.map((order) => {
                return {
                  flavor: order.flavor,
                  amount: order.amount * order.unit,
                };
              });
            })
            .flat();
        }),
        map((orders) => {
          return orders.reduce(
            //count amount of ice cream flavors from all orders
            (acc: Record<string, number[]>, item: OrderSummary) => {
              let key = item['flavor'];
              if (!acc[key]) {
                acc[key] = [];
              }
              acc[key].push(item.amount);
              return acc;
            },
            {}
          );
        }),
        map((summary) => {
          //convert to array of object
          return Object.entries(summary).map((flavor) => {
            return {
              flavor: flavor[0],
              amount: flavor[1].reduce((a: number, b: number) => a + b),
            };
          });
        })
      );
  }
}
