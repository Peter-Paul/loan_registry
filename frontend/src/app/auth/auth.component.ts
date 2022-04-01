import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private us:UsersService) { }

  ngOnInit(): void {
    this.refreshActive()
  }

  refreshActive(){
    this.us.refreshToken().subscribe( data => console.log(data))
  }


}
