import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Client } from 'src/app/modals/users';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css']
})
export class ViewClientComponent implements OnInit {
  @Input() client:Client
  @Input() clientView:string
  @Output() cv:EventEmitter<any>=new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  changeClientView(view){
    this.cv.emit(view)
  }
}
