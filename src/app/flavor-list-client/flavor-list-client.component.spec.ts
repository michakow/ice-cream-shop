import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlavorListClientComponent } from './flavor-list-client.component';

describe('FlavorListClientComponent', () => {
  let component: FlavorListClientComponent;
  let fixture: ComponentFixture<FlavorListClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlavorListClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlavorListClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
