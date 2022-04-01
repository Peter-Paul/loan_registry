import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashPurchaseComponent } from './dash-purchase.component';

describe('DashPurchaseComponent', () => {
  let component: DashPurchaseComponent;
  let fixture: ComponentFixture<DashPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashPurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
