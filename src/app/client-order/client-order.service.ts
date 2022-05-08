import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { format } from 'date-fns';
import { FirebaseError } from 'firebase/app';
import { catchError, map, of, switchMap } from 'rxjs';
import { Order } from '../models/order.model';
import { User } from '../models/user.model';
import { UnitListService } from '../unit-list/unit-list.service';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root',
})
export class ClientOrderService {
  constructor(
    private formBuilder: FormBuilder,
    private unitListService: UnitListService,
    private db: AngularFirestore,
    private userService: UserService
  ) {}

  public createForm(): FormGroup {
    const form = this.formBuilder.group({
      order: this.formBuilder.array([]),
    });

    return form;
  }

  getUnits() {
    return this.unitListService.getUnits();
  }

  sendOrder(
    order: {
      order: {
        flavor: string;
        unit: { unitName: string; value: number };
        amount: number;
      }[];
    },
    userName: string
  ) {
    const docID = this.generateDocID(28);
    const userID = this.userService.getUserID();
    this.db.doc<Order>(`orders/${docID}`).set(
      {
        client: userName,
        date: format(new Date(), 'yyyy-MM-dd'),
        order: order.order,
      },
      { merge: true }
    );
    this.db.doc<User>(`users/${userID}`).update({
      lastOrder: {
        date: format(new Date(), 'yyyy-MM-dd'),
        orderID: docID,
      },
    });
  }

  generateDocID(length: number) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  getLastOrder() {
    return this.userService.getLastOrder().pipe(
      switchMap((order) => {
        return this.db
          .doc<Order>(`orders/${order.orderID}`)
          .valueChanges()
          .pipe(
            catchError((err: FirebaseError) => of(err)),
            map((order) => {
              if (order instanceof FirebaseError || order === undefined)
                return null;
              else return order;
            })
          );
      })
    );
  }

  sendLastOrder(order: Order) {
    const docID = this.generateDocID(28);
    const userID = this.userService.getUserID();
    this.db.doc<Order>(`orders/${docID}`).set(
      {
        client: order.client,
        order: order.order,
        date: format(new Date(), 'yyyy-MM-dd'),
      },
      { merge: true }
    );
    this.db.doc<User>(`users/${userID}`).update({
      lastOrder: {
        date: format(new Date(), 'yyyy-MM-dd'),
        orderID: docID,
      },
    });
  }
}
