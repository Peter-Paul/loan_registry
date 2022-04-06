import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashArchiveComponent } from './dash-archive.component';

describe('DashArchiveComponent', () => {
  let component: DashArchiveComponent;
  let fixture: ComponentFixture<DashArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashArchiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
