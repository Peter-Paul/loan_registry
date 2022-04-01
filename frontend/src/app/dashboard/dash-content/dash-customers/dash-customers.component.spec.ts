import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashCustomersComponent } from './dash-customers.component';

describe('DashCustomersComponent', () => {
  let component: DashCustomersComponent;
  let fixture: ComponentFixture<DashCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashCustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
