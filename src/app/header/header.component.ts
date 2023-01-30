import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private auth:AuthService,private route:Router){}

  logout(){
    this.auth.logout();
  }

  loadHome(){
    this.route.navigate(['home'])
  }

  loadBook(){
    this.route.navigate(['book'])
  }
}
