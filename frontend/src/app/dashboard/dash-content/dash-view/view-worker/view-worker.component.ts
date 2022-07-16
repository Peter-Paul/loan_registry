import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Person } from 'src/app/modals/users';

@Component({
  selector: 'app-view-worker',
  templateUrl: './view-worker.component.html',
  styleUrls: ['./view-worker.component.css']
})
export class ViewWorkerComponent implements OnInit {
  @Input() worker:Person
  @Input() currentUser:Person
  @Input() edit:Boolean
  @Output() ew:EventEmitter<any>=new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  editWorker(){
    this.ew.emit()
  }
}
