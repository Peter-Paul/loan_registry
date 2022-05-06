import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-rates',
  templateUrl: './card-rates.component.html',
  styleUrls: ['./card-rates.component.css']
})
export class CardRatesComponent implements OnInit {
  @Input() degreeValue
  @Input() metric
  @Input() total
  @Input() info
  constructor() { }

  ngOnInit(): void {
  }

}
