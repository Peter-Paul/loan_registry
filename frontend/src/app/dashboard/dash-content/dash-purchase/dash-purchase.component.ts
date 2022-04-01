import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Users } from 'src/app/modals/users';

@Component({
  selector: 'app-dash-purchase',
  templateUrl: './dash-purchase.component.html',
  styleUrls: ['./dash-purchase.component.css']
})
export class DashPurchaseComponent implements OnInit {
  @Output() updateform:EventEmitter<any> =new EventEmitter()
  @Output() aps:EventEmitter<any> =new EventEmitter()
  @Output() dps:EventEmitter<any> =new EventEmitter()
  @Input() user:Users
  @Input() users:Users[]
  @Input() currentUser:Users
  agents=[]
  cUserProducts:any[]=[]
  soldProducts
  allsoldProducts
  totalHoldings
  conversionRate
  totalConversionRate
  constructor() { }

  ngOnInit(): void {
    
    this.agents=this.users.filter(u=>u.role==='agent' && u.holding>0)
    this.metrics()
    
    // this.attachAgentDetail()
  }

  metrics(){
    this.soldProducts=this.currentUser.products.map(p=>p.amount).reduce((a, b) => a + b, 0)
    if (this.agents.length>0) this.totalHoldings=this.agents.map(a=>a.holding).reduce((a, b) => a + b, 0)
    console.log(this.totalHoldings-this.soldProducts)
    if (this.soldProducts>0 && this.totalHoldings>0) {
      this.conversionRate=100-Math.floor(((this.currentUser.holding-this.soldProducts)/this.currentUser.holding)*100)
      this.totalConversionRate=100-Math.floor(((this.totalHoldings-this.soldProducts)/this.totalHoldings)*100)
      console.log(this.totalConversionRate)
    }else{ this.conversionRate=0}
  }
  // ngOnChanges(changes: any): void {
  //   const cu=changes.currentUser
  //   if (cu.previousValue) {
  //     this.attachAgentDetail()
  //   }
  // }
  attachAgentDetail(){
    if (this.agents.length>0){
      const cu = this.currentUser.products.slice()
      this.cUserProducts=cu.map(p=>{return {...p,agent:this.agents.filter(a=>a.id===p.user)[0].username}})
    }
  }
  addperformances(data:any){
    this.aps.emit(data)
  }
  deleteperformances(data:any){
    this.dps.emit(data)
  }
  userUpdateForm(data:any){
    this.updateform.emit(data)
  }

}
