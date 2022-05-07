import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Person } from 'src/app/modals/users';
import {quotes } from './quotes'

@Component({
  selector: 'app-dash-dashboard',
  templateUrl: './dash-dashboard.component.html',
  styleUrls: ['./dash-dashboard.component.css']
})
export class DashDashboardComponent implements OnInit {
  @Input() currentUser:Person
  @Output() uview:EventEmitter<any> =new EventEmitter()
  greeting:string
  date:number = new Date().getDate()
  quote:string
  constructor() { }

  ngOnInit(): void {
    this.setGreeting()
    this.setDailyQuote()
  }
  setGreeting(){
    const hour = new Date().getHours()
    if (hour < 12) {
        this.greeting="Good Morning"
    }else if (hour < 18) {
        this.greeting="Good Afternoon"
    }else {this.greeting="Good Evening"}
  }

  setDailyQuote(){
    const dateQuotes = quotes.filter(q => quotes.indexOf(q)%this.date == 0 )
    const random = Math.floor(Math.random() * dateQuotes.length)
    this.quote = dateQuotes[random]
  }

  updateView(view:string){
    this.uview.emit(view)
  }

}
