import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  param = {value: 'world'};

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'sl', 'de']);
    translate.setDefaultLang('en');
  }

  public selectLanguage(event: any) {
    this.translate.use(event.target.value);
  }
}
