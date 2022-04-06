import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Person } from 'src/app/modals/users';

@Component({
  selector: 'app-dash-table',
  templateUrl: './dash-table.component.html',
  styleUrls: ['./dash-table.component.css']
})
export class DashTableComponent implements OnInit {
  @Output() sprofile:EventEmitter<any> = new EventEmitter()
  @Output() uview:EventEmitter<any> = new EventEmitter()
  @Input() users:Person[]
  @Input() currentView:string
  @Input() view
  constructor() { }

  ngOnInit(): void {
  }

}
