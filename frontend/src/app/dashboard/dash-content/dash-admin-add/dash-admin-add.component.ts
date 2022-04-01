import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Product, Users}  from 'src/app/modals/users'

@Component({
  selector: 'app-dash-admin-add',
  templateUrl: './dash-admin-add.component.html',
  styleUrls: ['./dash-admin-add.component.css']
})
export class DashAdminAddComponent implements OnInit {
  @Input() addType:any
  @Input() user:Users
  @Input() agents:Users[]
  @Output() aps:EventEmitter<any> =new EventEmitter()
  @Output() dps:EventEmitter<any> =new EventEmitter()
  @Output() closeModal:EventEmitter<any> =new EventEmitter()
  product:Product=new Product()
  constructor() { }

  ngOnInit(): void {
  }
  addperformances(){
    this.product.customer=this.user.id
    this.product.amount.toString()
    // console.log(this.product)
    // console.log({uid:this.user.id.toString(),payload:this.product})
    this.aps.emit({payload:this.product})
    this.closeModal.emit()
  }
  deleteproducts(){
    this.product.id=(this.user.products.length+1).toString()
    this.dps.emit({uid:this.user.id.toString(),payload:this.product})
  }
}
