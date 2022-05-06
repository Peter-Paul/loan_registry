import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Login, Signup } from 'src/app/modals/auth';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-loginforms',
  templateUrl: './loginforms.component.html',
  styleUrls: ['./loginforms.component.css']
})
export class LoginformsComponent implements OnInit {
  @Output() closeForm:EventEmitter<any>=new EventEmitter()
  available:boolean=false
  signupuser:Signup={username:"",email:"",password:"",role:"customer"}
  loginuser:Login={email:"",password:""}
  password2:string=""
  roles=["customer","agent"]
  constructor(private us:UsersService) { }

  ngOnInit(): void {
  }
  login(){
    this.us.signin(this.loginuser).subscribe(data=>{return data})
    this.closeForm.emit()
  }
  signup(){
  //   this.us.signup(this.signupuser).subscribe(data=>console.log(data))
  //   this.closeForm.emit()
  }
  forgotpwd(){}

}
