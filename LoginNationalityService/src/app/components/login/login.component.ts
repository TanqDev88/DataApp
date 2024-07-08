import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  lat: string = '';
  showError: boolean = false;
  errorMessage: string = '';

  constructor(private usersService: UsersService, private router: Router,  private translate: TranslateService) {}

  onLogin() {
    this.usersService
      .login(this.email, this.lat)
      .subscribe((isValid: boolean) => {
        if (isValid) {
          this.router.navigate(['/main']);
        } else {
          this.translate.get('ERROR_MESSAJE').subscribe((translatedMessage: string) => {
            this.errorMessage = translatedMessage;
            this.showError = true;
          });
        }
      });
  }
}
