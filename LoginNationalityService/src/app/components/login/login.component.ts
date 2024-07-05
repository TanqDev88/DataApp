import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  lat: string = '';
  showError: boolean = false;
  errorMessage: string = '';

  constructor(private usersService: UsersService, private router: Router) {}

  onLogin() {
    this.usersService
      .login(this.email, this.lat)
      .subscribe((isValid: boolean) => {
        if (isValid) {
          this.router.navigate(['/main']);
        } else {
          this.errorMessage = 'Datos incorrectos. Revise usuario y/o clave';
          this.showError = true;
        }
      });
  }
}
