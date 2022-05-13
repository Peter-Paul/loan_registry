import { Component, Input, OnInit } from '@angular/core';
import { Person } from 'src/app/modals/users';

@Component({
  selector: 'app-card-rates',
  templateUrl: './card-rates.component.html',
  styleUrls: ['./card-rates.component.css']
})
export class CardRatesComponent implements OnInit {
  @Input() currentUser:Person
  @Input() degreeValue
  @Input() metric
  @Input() total
  @Input() info
  constructor() { }

  ngOnInit(): void {  }

}
