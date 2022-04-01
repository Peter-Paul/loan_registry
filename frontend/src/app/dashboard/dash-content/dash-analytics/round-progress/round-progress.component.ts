import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-round-progress',
  templateUrl: './round-progress.component.html',
  styleUrls: ['./round-progress.component.css']
})
export class RoundProgressComponent implements OnInit {
  @Input() degreeValue
  @Input() metric
  
  @HostBinding('style.--degree')
  @Input() degree

  constructor() { 
  }
  
  ngOnInit(): void {
    console.log(this.degree)
  }

}
