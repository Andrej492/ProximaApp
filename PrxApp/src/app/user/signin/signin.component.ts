import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
  @ViewChild('signinForm') form: NgForm;
  token: string;
  isLoggedIn: boolean;
  logSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    public translate: TranslateService) { }

  ngOnInit(): void {
    this.logSub = this.authService.isLogged.subscribe(res => this.isLoggedIn = res);
  }

  onSubmit() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.authService.signinUser(email, password).then( (data: string) => {
      this.token = data;
      this.authService.tokenFromLogin.next(this.token);
      if(this.isLoggedIn) {
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnDestroy(): void {
      this.logSub.unsubscribe();
  }
}
