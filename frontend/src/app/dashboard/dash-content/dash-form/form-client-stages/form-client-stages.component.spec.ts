import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormClientStagesComponent } from './form-client-stages.component';

describe('FormClientStagesComponent', () => {
  let component: FormClientStagesComponent;
  let fixture: ComponentFixture<FormClientStagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormClientStagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormClientStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
