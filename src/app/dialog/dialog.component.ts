import { Component, Inject } from '@angular/core';
import { inject } from '@angular/core/testing';
import {NgForm} from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { backendService } from '../services/backend.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  constructor(private api:backendService,public dialogRef:MatDialogRef<DialogComponent>){}

  onNoClick():void{
    this.dialogRef.close();
  }

  getData(data:any){
    console.log(data)
    this.api.createBook(data.bName,data.aName,data.price).subscribe(()=>{
      console.log('create new book');
      window.location.reload()
    })
  }
}
