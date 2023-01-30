import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username:string='';
  password:string='';
  errMsg:string='';

  constructor(public auth:AuthService,public router:Router){}

  onLogin(){
    if(this.username.trim().length===0){
      this.errMsg='Username is required'
    }
    else if(this.password.trim().length===0){
      this.errMsg='Password is required'
    }
    else{
      this.errMsg='';
      let err=this.auth.login(this.username,this.password);
      if(err===200){
        this.router.navigate(['home'])
      }
      if(err===403){
        this.errMsg='Invalid Credentials'
      }
    }
  }

}
