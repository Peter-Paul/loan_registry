import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-form-changepassword',
  templateUrl: './form-changepassword.component.html',
  styleUrls: ['./form-changepassword.component.css']
})
export class FormChangepasswordComponent implements OnInit {
  changePwd = { oldPassword:"",password:"" }
  newCheck = ""
  constructor(private us:UsersService) { }

  ngOnInit(): void {
  }
  changePassword(){
    if (this.changePwd.password.length<8)  return alert(`Password must be atleast 8 characters long`)
    this.changePwd.password == this.newCheck ? 
    this.us.changePassword(this.changePwd).subscribe() : 
    alert( `New and check password don't match` )
  }

}
