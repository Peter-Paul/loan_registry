import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWorkerComponent } from './form-worker.component';

describe('FormWorkerComponent', () => {
  let component: FormWorkerComponent;
  let fixture: ComponentFixture<FormWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormWorkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
