import { TranslateService } from '@ngx-translate/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  logSub: Subscription;

  constructor(
    private authService: AuthService,
    public translate: TranslateService) {
      // translate.addLangs(['en', 'sl', 'de']);
      // translate.setDefaultLang('en');
      // const browserLang = translate.getBrowserLang();
      // translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
     }

  ngOnInit(): void {
    this.logSub = this.authService.isLogged.subscribe(loginRes => {
      this.isAuthenticated = loginRes;
    });
  }

  public selectLanguage(event: any) {
    this.translate.use(event.target.value);
  }

  ngOnDestroy(): void {
      this.logSub.unsubscribe();
  }

}
