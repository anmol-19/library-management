import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { backendService } from '../services/backend.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let injector:TestBed
  let router:Router
  let httpMock:HttpClientTestingModule
  let service:backendService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports:[
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    injector=getTestBed()
    router=injector.inject(Router)
    service=injector.inject(backendService)
    httpMock=injector.inject(HttpClientTestingModule)

    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate home',()=>{
    const navigateSpy=spyOn(router,'navigate')
    component.loadHome()
    expect(navigateSpy).toHaveBeenCalledWith(['home'])
  })

  it('should navigate book',()=>{
    const navigateSpy=spyOn(router,'navigate')
    component.loadBook()
    expect(navigateSpy).toHaveBeenCalledWith(['book'])
  })

  it('should logout successfully',()=>{
    const navigateSpy=spyOn(router,'navigate') 
    component.logout()
    expect(navigateSpy).toHaveBeenCalledWith(['login'])
  })

});
