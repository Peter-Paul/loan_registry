import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormChangepasswordComponent } from './form-changepassword.component';

describe('FormChangepasswordComponent', () => {
  let component: FormChangepasswordComponent;
  let fixture: ComponentFixture<FormChangepasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormChangepasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormChangepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
