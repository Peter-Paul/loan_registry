import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashDashboardComponent } from './dash-dashboard.component';

describe('DashDashboardComponent', () => {
  let component: DashDashboardComponent;
  let fixture: ComponentFixture<DashDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
