import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title='frontend'
  constructor(private ms:NgbModal){}
  open(content:any) {
    this.ms.open(content);
  }
}
