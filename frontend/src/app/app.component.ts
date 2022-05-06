import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Web3 from 'web3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title='frontend'
  web3
  constructor(private ms:NgbModal){}
  open(content:any) {
    this.ms.open(content);
  }

  ngOnInit(): void {
          // this.minuteBeforeExpiry=data.credentials.exp-60000 // one minute = 60000 micro seconds
      // console.log(this.minuteBeforeExpiry)
  }

}
