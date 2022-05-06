import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlavorListAdminComponent } from './flavor-list-admin.component';

describe('FlavorListAdminComponent', () => {
  let component: FlavorListAdminComponent;
  let fixture: ComponentFixture<FlavorListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlavorListAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlavorListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
