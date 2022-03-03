import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
  @ViewChild('signinForm') form: NgForm;
  isAuthenticated = false;
  logSub: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.logSub = this.authService.isLogged.subscribe(loginRes => {
      this.isAuthenticated = loginRes;
    });
  }

  onSubmit() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.authService.signinUser(email, password);
    if(this.isAuthenticated) {
      this.router.navigate(['home']);
    }
  }

  ngOnDestroy(): void {
    this.logSub.unsubscribe();
}
}
