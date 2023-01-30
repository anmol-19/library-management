import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { of } from 'rxjs';
import { backendService } from '../services/backend.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UpdateDialogComponent } from './update-dialog.component';

describe('UpdateDialogComponent', () => {
  let component: UpdateDialogComponent;
  let fixture: ComponentFixture<UpdateDialogComponent>;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDialogComponent ],
      imports: [HttpClientTestingModule],
      providers:[backendService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDialogComponent);
    component = fixture.componentInstance;
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
    fixture.detectChanges();
  });

    it('should run the getUpdateData fn' ,()=>{
      const temp={
        bName:'a',
        aName:'b',
        price:1
      }
      spyOn(window,'alert')
      component.idData.data=1
      component.getUpdateData(temp)
      httpMock.expectOne('http://localhost:3000/1')
      expect(window.alert).toHaveBeenCalledWith('Updated Successfully')
    })
  
});
