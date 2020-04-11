import { TestBed, async, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StorageService } from './core/services/storage.service';
import { AuthenticationService } from './login/shared/authentication.service';
//import { HttpClientTestingModule } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';

@Component({selector: 'router-outlet', template: ''})
class RouterOutletStubComponent { }

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      //imports: [
      //  FormsModule,
      //  ReactiveFormsModule,
        //HttpClientTestingModule
      //],
      declarations: [
        AppComponent,
        RouterOutletStubComponent
      ],
      providers:[StorageService, AuthenticationService],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'SkeletonAngular'`, () => { //async(inject([StorageService], (storageService: StorageService)
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('SkeletonAngular');
  }); //))

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to SkeletonAngular!');
  // });
});
