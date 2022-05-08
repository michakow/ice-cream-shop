import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, tap } from 'rxjs';
import { Flavor } from '../models/flavor.model';
import { User } from '../models/user.model';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root',
})
export class FlavorListClientService {
  private favoritesFlavors: BehaviorSubject<string[]> = new BehaviorSubject([
    '',
  ]);

  constructor(private db: AngularFirestore, private userSerive: UserService) {}

  getFlavors() {
    return this.db.collection<Flavor>('icecreams').valueChanges();
  }

  getFavoriteFlavors() {
    return this.userSerive
      .getUserFavoriteFlavors()
      .pipe(tap((flavors) => this.favoritesFlavors.next(flavors)));
  }

  addFlavorToFavorites(flavor: string) {
    const userID = this.userSerive.getUserID();
    if (this.favoritesFlavors.getValue().includes(flavor)) return;
    const newFavoriteList = [...this.favoritesFlavors.getValue(), flavor];
    this.db.doc<User>(`users/${userID}`).update({
      favoriteFlavors: [...newFavoriteList],
    });
  }

  removeFlavorFromFavorites(flavor: string) {
    const userID = this.userSerive.getUserID();
    const newFavoriteList = this.favoritesFlavors
      .getValue()
      .filter((fav) => fav !== flavor);
    this.db.doc<User>(`users/${userID}`).update({
      favoriteFlavors: [...newFavoriteList],
    });
  }
}
