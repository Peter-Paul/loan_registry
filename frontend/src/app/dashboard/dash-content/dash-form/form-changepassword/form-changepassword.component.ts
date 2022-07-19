import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-form-changepassword',
  templateUrl: './form-changepassword.component.html',
  styleUrls: ['./form-changepassword.component.css']
})
export class FormChangepasswordComponent implements OnInit {
  changePwd = { oldPassword:"",password:"" }
  constructor(private us:UsersService) { }

  ngOnInit(): void {
  }
  changePassword(){
    this.us.changePassword(this.changePwd).subscribe(data=>console.log(data))
  }

}
