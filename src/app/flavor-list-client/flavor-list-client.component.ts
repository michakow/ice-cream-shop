import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Flavor } from '../models/flavor.model';
import { FlavorListClientService } from './flavor-list-client.service';

@Component({
  selector: 'app-flavor-list-client',
  templateUrl: './flavor-list-client.component.html',
  styleUrls: ['./flavor-list-client.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlavorListClientComponent implements OnInit {
  flavorList$!: Observable<Flavor[]>;
  favoriteList$!: Observable<string[]>;

  constructor(private flavorListService: FlavorListClientService) {}

  ngOnInit(): void {
    this.flavorList$ = this.flavorListService.getFlavors();
    this.favoriteList$ = this.flavorListService.getFavoriteFlavors();
  }

  addToFavorites(flavor: string) {
    this.flavorListService.addFlavorToFavorites(flavor);
  }

  removeFromFavorites(flavor: string) {
    this.flavorListService.removeFlavorFromFavorites(flavor);
  }
}
