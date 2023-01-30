import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { computeStyles } from '@popperjs/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { computeMsgId } from '@angular/compiler';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let injector:TestBed
  let service:AuthService
  let httpMock:HttpTestingController
  let router:Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    injector=getTestBed();
    service=injector.inject(AuthService)
    httpMock=injector.inject(HttpTestingController)
    router=injector.inject(Router)

    fixture.detectChanges();
  });

  it('it should login and navigate to home',()=>{
    const navigateSpy=spyOn(router,'navigate')
    component.username='Anmol'
    component.password='1234'
    component.onLogin()
    expect(component.errMsg).toBe('')
    expect(navigateSpy).toHaveBeenCalledWith(['home'])
  })

  it('should not work without username',()=>{
    component.username=''
    component.password='1234'
    component.onLogin()
    expect(component.errMsg).toBe('Username is required')

  })

  it('it should not work without password',()=>{
    component.username='Anmol'
    component.password=''
    component.onLogin()
    expect(component.errMsg).toBe('Password is required')
  })

  it('should failed for invalid login credentials',()=>{
    component.username='Anmmol'
    component.password='1234'
    component.onLogin()
    expect(component.errMsg).toBe('Invalid Credentials')
  })
  // it('it should login and navigate to home',()=>{
  //   const navigateSpy=spyOn(router,'navigate')
  //   component.username='Anmol'
  //   component.password='1234'
  //   component.onLogin()
  //   httpMock.expectOne('http://localhost:3000/login').flush({
  //     status:200
  //   })
  //   expect(component.errMsg).toBe('')
  //   expect(navigateSpy).toHaveBeenCalledWith(['home'])
  // })

});
