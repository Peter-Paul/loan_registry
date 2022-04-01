import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashAdminAddComponent } from './dash-admin-add.component';

describe('DashAdminAddComponent', () => {
  let component: DashAdminAddComponent;
  let fixture: ComponentFixture<DashAdminAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashAdminAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashAdminAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
