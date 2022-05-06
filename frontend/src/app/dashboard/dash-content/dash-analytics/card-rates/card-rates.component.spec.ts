import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRatesComponent } from './card-rates.component';

describe('CardRatesComponent', () => {
  let component: CardRatesComponent;
  let fixture: ComponentFixture<CardRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
