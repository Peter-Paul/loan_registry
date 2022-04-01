import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginformsComponent } from './loginforms.component';

describe('LoginformsComponent', () => {
  let component: LoginformsComponent;
  let fixture: ComponentFixture<LoginformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginformsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
