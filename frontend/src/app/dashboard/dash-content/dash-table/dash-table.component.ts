import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable,of } from 'rxjs';
import { map,startWith } from 'rxjs/operators'
import { Users } from 'src/app/modals/users';


const search = (text: string,data:Users[]): Users[] => {
  return data.filter(user => {
    const term = text.toLowerCase();
    return user.username.toLowerCase().includes(term)
          || user.email.toLowerCase().includes(term)
          || user.firstname.toLowerCase().includes(term)
  });
}

@Component({
  selector: 'app-dash-table',
  templateUrl: './dash-table.component.html',
  styleUrls: ['./dash-table.component.css'],
})

export class DashTableComponent implements OnInit {
  @Output() sprofile:EventEmitter<any> = new EventEmitter()
  @Output() uview:EventEmitter<any> = new EventEmitter()
  @Input() users:Users[]
  searchUsers$: Observable<Users[]>
  users$: Observable<Users[]>
  paginatedUsers:Users[]
  filter = new FormControl('')
  page = 1;
  pageSize = 6;
  collectionSize:number

  constructor() { 
    this.refreshUsers()
    // this.searchUsers$=this.filter.valueChanges.pipe(
    //   startWith(""),
    //   map(text=>{
    //     this.search(text,this.paginatedUsers)
    //   }))
    // .subscribe(data=>console.log(data))
    }
  
  ngOnInit(): void {
    this.collectionSize=this.users.length
    this.refreshUsers()
    this.usertoobservable()
  }

  usertoobservable(){
    this.users$=of(this.users)
  }
  search(text: string,data:Users[]):Users[]{
    console.log("searching..")
    return data.filter(user => {
      const term = text.toLowerCase();
      return user.username.toLowerCase().includes(term)
            || user.email.toLowerCase().includes(term)
            || user.firstname.toLowerCase().includes(term)
    });
  }
  refreshUsers() {
    if (this.users){
      this.paginatedUsers = this.users
        .map((user, i) => ({uid: i + 1, ...user}))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }
  }
  showProfile(user:Users){
    this.sprofile.emit(user)
  }
  updateView(){
    this.uview.emit('details')
  }
}
