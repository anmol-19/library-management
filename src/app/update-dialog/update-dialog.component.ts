import { Component, Inject } from '@angular/core';
import { backendService } from '../services/backend.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'

import { Data } from '@angular/router';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss']
})
export class UpdateDialogComponent {
  updatedValue:any;

  constructor(public api:backendService,@Inject(MAT_DIALOG_DATA) public idData:{data:any}){}

  getUpdateData(data:any){
    console.log(data);
    console.log(`id data ${this.idData}`)
    this.api.updateBook(this.idData,data.bName,data.aName,data.price).subscribe(()=>{
      alert('Updated Successfully')
    })
    window.location.reload()
  }
}
