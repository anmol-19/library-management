import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatOptgroup } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { backendService } from '../services/backend.service';
import {FormsModule} from '@angular/forms'
import { DialogComponent } from './dialog.component';
import { of } from 'rxjs';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let mockDialofRef:jasmine.SpyObj<MatDialogRef<DialogComponent>>
  let mockAuthService = jasmine.createSpyObj<backendService>('backendService', ['createBook']);
  beforeEach(async () => {
    mockDialofRef=jasmine.createSpyObj('MatDialogRef',['close'])
    await TestBed.configureTestingModule({
      declarations: [ DialogComponent ],
      imports:[
        FormsModule
      ],
      providers:[{provide:backendService,useValue:mockAuthService},{provide:MatDialogRef,useValue:mockDialofRef}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  });

  it('should get call onNoClick',()=>{
    component.onNoClick()
    expect(mockDialofRef.close).toHaveBeenCalled()
  })

  it('should run the getData fn',()=>{
    mockAuthService.createBook.and.returnValue(of([]))
    component.getData({bName:'a',aName:'a',price:1});

    expect(mockAuthService.createBook).toHaveBeenCalled()
  })
});
