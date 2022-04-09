import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Client } from 'src/app/modals/users';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.css']
})
export class FormClientComponent implements OnInit {
  @Input() client:Client
  @Input() action:string
  @Input() clientView:string
  @Output() cv:EventEmitter<any>=new EventEmitter()
  genders=["Male", "Female"]
  types=[ "CS Client", "LBF Client"]
  constructor() { }

  ngOnInit(): void {
  }
  changeClientView(view:string){
    this.cv.emit(view)
  }
  clientPatch(){}

}
