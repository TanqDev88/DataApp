import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LoginNationalityService';

  constructor(private translate: TranslateService) {
    const browserLang = translate.getBrowserLang();
    if (browserLang) {
      translate.use(browserLang.match(/en|es/) ? browserLang : 'en');
    } else {
      translate.use('en');
    }
  }
}
