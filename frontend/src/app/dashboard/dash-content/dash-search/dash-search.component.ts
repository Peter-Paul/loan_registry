import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { Users } from 'src/app/modals/users';

@Component({
  selector: 'app-dash-search',
  templateUrl: './dash-search.component.html',
  styleUrls: ['./dash-search.component.css']
})
export class DashSearchComponent implements OnInit {
  @Output() sprofile:EventEmitter<any> = new EventEmitter()
  @Output() uview:EventEmitter<any> = new EventEmitter()
  @Input() users:Users[]
  pageSettings:PageSettingsModel = { pageSize: 6 }
  data
  constructor() { }

  ngOnInit(): void {
    this.mutateUsers()
  }

  mutateUsers(){
    this.data=this.users.map(u=>{return { username:u.username, role:u.role }})
  }

  showProfile(user){
    const {index,foreignKeyData,column,...data}=user
    // console.log(data)
    this.sprofile.emit(data)
  }
  updateView(){
    this.uview.emit('details')
  }
}
