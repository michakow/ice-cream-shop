import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { format } from 'date-fns';
import { Order } from '../models/order.model';
import { UnitListService } from '../unit-list/unit-list.service';

@Injectable({
  providedIn: 'root',
})
export class ClientOrderService {
  constructor(
    private formBuilder: FormBuilder,
    private unitListService: UnitListService,
    private db: AngularFirestore
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
    this.db.doc<Order>(`orders/${docID}`).set(
      {
        client: userName,
        date: format(new Date(), 'yyyy-MM-dd'),
        order: order.order,
      },
      { merge: true }
    );
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
}
