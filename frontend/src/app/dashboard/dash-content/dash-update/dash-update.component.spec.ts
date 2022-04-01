import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashUpdateComponent } from './dash-update.component';

describe('DashUpdateComponent', () => {
  let component: DashUpdateComponent;
  let fixture: ComponentFixture<DashUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
