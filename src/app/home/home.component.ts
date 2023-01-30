import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { backendService } from '../services/backend.service';


interface Country {
	id?: number;
	name: string;
	author: string;
	price: Number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  data:Country[]=[]
  bookCount:number=0;
  constructor(private route:Router,public api:backendService){}

  ngOnInit(){
   
    this.api.getBook().subscribe((tempData:any)=>{
      this.data=tempData
      this.bookCount=this.data.length
      console.log('data fetch successfully')
      console.log(this.bookCount)
    })
    
  }

  loadBook(){
    console.log("aaya loadbook pe")
    this.route.navigate(['book'])
  }
}
