import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { Router, RouteReuseStrategy } from '@angular/router';
import { of } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { backendService } from '../services/backend.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let injector:TestBed
  let router:Router
  let httpMock:HttpTestingController
  let mockAuthService:jasmine.SpyObj<backendService>

  interface Country {
    id?: number;
    name: string;
    author: string;
    price: Number;
  }

  beforeEach(async () => {

    mockAuthService = jasmine.createSpyObj<backendService>('backendService', ['getBook'])

    mockAuthService.getBook.and.returnValue(of([{
      id:1,
      name:'unknown',
      author:'yeh bhi nhi pta',
      price:100
    }]))

    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers:[{provide:backendService,useValue:mockAuthService}],
      imports:[
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    injector=getTestBed();
    httpMock=injector.inject(HttpTestingController)
    router=injector.inject(Router)

    component.data=[
      {
        id:1,
        name:'unknown',
        author:'yeh bhi nhi pta',
        price:100
      }
    ]

    fixture.detectChanges();
  });

  it('should navigate to the book',()=>{
    const navigateSpy=spyOn(router,'navigate')
    component.loadBook()
    expect(navigateSpy).toHaveBeenCalledWith(['book'])
  })

  it('should fetch bookCount initially',()=>{
    component.ngOnInit()
    expect(component.data).toEqual([
      {
        id:1,
        name:'unknown',
        author:'yeh bhi nhi pta',
        price:100
      }
    ])
  })

});
