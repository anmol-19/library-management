import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private route:Router) { }
  login(uname:string,pward:string){
    if(uname==='Anmol' && pward==='1234'){
      return 200;
    }
    else{
      return 403;
    }
  }

  logout(){
    this.route.navigate(['login']);
  }
}