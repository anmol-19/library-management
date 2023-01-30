import { Component, Inject} from '@angular/core';
import axios from 'axios';
import {MatDialog,MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { backendService } from '../services/backend.service';
import { Router } from '@angular/router';
import { DecimalPipe, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

interface Country {
	id?: number;
	name: string;
	author: string;
	price: Number;
}

//let COUNTRIES:Country[]=[]

@Component({
	selector: 'app-book',
	templateUrl: './book.component.html',
	styleUrls: ['./book.component.scss'],

})
export class BookComponent {
	COUNTRIES:Country[]=[]
	countries: Country[]=[];
	data: any;
	id:any;

	ngOnInit(){
		
		//console.log(this.api)
		this.api.getBook().subscribe((data:any)=>{
			let temp:Country[]=data
			console.log(temp);
			this.COUNTRIES=temp;
			this.refreshCountries(temp);
			console.log(this.COUNTRIES)
		})
		
		
	}

	constructor(private dialog:MatDialog,public api:backendService,private route:Router) {
		//this.refreshCountries()
	}
	
	refreshCountries(data:any) {
		//console.log(this.COUNTRIES)
		this.countries=data
	}

	openDialog():void{
	 	const dialogRef=this.dialog.open(DialogComponent);
		dialogRef.afterClosed().subscribe(()=>{
			console.log('The dialog is successfully closed')
		})
	}

	updateBook(data:any){
		this.id=data;
		this.dialog.open(UpdateDialogComponent,{
			data:data
		})
	}

	deleteBook(id:any){
		this.api.deleteOneBook(Number(id)).subscribe(()=>{
			alert('Book Successfully Deleted');
		})
		window.location.reload()
	}
}

