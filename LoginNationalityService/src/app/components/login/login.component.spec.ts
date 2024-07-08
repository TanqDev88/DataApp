import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

import { LoginComponent } from './login.component';
import { UsersService } from '../../services/users.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let usersService: jasmine.SpyObj<UsersService>;
  let router: jasmine.SpyObj<Router>;
  let translate: TranslateService;

  beforeEach(async () => {
    const usersServiceSpy = jasmine.createSpyObj('UsersService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, TranslateModule.forRoot()],
      declarations: [LoginComponent],
      providers: [
        { provide: UsersService, useValue: usersServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    translate = TestBed.inject(TranslateService);
    usersService = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an error message when login fails', () => {
    const translatedError = 'Datos incorrectos. Revise usuario y/o clave';
    spyOn(translate, 'get').and.returnValue(of(translatedError));

    usersService.login.and.returnValue(of(false));
    component.onLogin();

    expect(usersService.login).toHaveBeenCalledWith(component.email, component.lat);
    expect(component.errorMessage).toBe(translatedError);
    expect(component.showError).toBeTrue();
  });

  it('should navigate to /main when login is successful', () => {
    usersService.login.and.returnValue(of(true));
    component.onLogin();

    expect(usersService.login).toHaveBeenCalledWith(component.email, component.lat);
    expect(router.navigate).toHaveBeenCalledWith(['/main']);
  });
});
