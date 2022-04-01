import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-analytics',
  templateUrl: './team-analytics.component.html',
  styleUrls: ['./team-analytics.component.css']
})
export class TeamAnalyticsComponent implements OnInit {
  @Input() team
  constructor() { }

  ngOnInit(): void {
  }

}
