import { HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { DialogComponent } from '../dialog/dialog.component';
import { AuthService } from '../services/auth.service';
import { backendService } from '../services/backend.service';

import { BookComponent } from './book.component';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let injector:TestBed
  let httpMock:HttpTestingController
  let router:Router
  let dialog:MatDialog
  let api:backendService
  let mockAuthService: jasmine.SpyObj<backendService>;
  let mockdialogRef:  jasmine.SpyObj<MatDialog>

  interface Country {
    id?: number;
    name: string;
    author: string;
    price: Number;
  }

  beforeEach(async () => {
    
  
    mockdialogRef=jasmine.createSpyObj<MatDialog>('MatDialog',['open'])
    let mockdialog=jasmine.createSpyObj('MatDialogRef',['afterClosed'])
    mockdialog.afterClosed.and.returnValue(of([]))
    mockdialogRef.open.and.returnValue(mockdialog)
  
    mockAuthService = jasmine.createSpyObj<backendService>('backendService', ['getBook','deleteOneBook']);
    mockAuthService.getBook.and.returnValue(of([{
          id:1,
          name:'unknown',
          author:'yeh bhi nhi pta',
          price:100
        }]))
    
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ BookComponent ],
      providers: [{ provide: backendService, useValue: mockAuthService, },
        {provide:MatDialog,useValue:mockdialogRef}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;

    injector=getTestBed();
    router=injector.inject(Router)
    // dialog=injector.inject(MatDialog)
    api=injector.inject(backendService)
    // mockdialogRef=TestBed.inject(MatDialog)
    //mockAuthService=TestBed.inject('backendService')
    component.countries=[
      {
          id:1,
          name:'unknown',
          author:'yeh bhi nhi pta',
          price:100
    }]

    fixture.detectChanges();
  });

  it('should fetch initial data from getData api',()=>{
    const navigateSpy=spyOn(router,'navigate')
   
    console.log(mockAuthService.getBook())
    component.ngOnInit()
    expect(component.COUNTRIES).toEqual([
      {
        id:1,
        name:'unknown',
        author:'yeh bhi nhi pta',
        price:100
      }
    ]
    )
   })

  it('should run refreshCountries fn',()=>{
    let expectedData=[
      {
        id:1,
        name:'unknown',
        author:'yeh bhi nhi pta',
        price:100
      }
    ]
    component.refreshCountries(expectedData)
    expect(component.countries).toEqual(expectedData)
  })
  
  it('should check the openDialog',()=>{
    component.openDialog()
    expect(mockdialogRef.open).toHaveBeenCalled()
  })

  it('should have been update',()=>{
    component.updateBook(1)
    expect(mockdialogRef.open).toHaveBeenCalled()
  })

  it('should delete the spefic book',()=>{
    // mockAuthService = jasmine.createSpyObj<backendService>('backendService', ['deleteOneBook']);
    mockAuthService.deleteOneBook.and.returnValue(of([]))
    component.deleteBook(0)
    expect(mockAuthService.deleteOneBook).toHaveBeenCalled()
  })
});
