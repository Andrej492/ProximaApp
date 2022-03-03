import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('signupForm') form: NgForm;
  token: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.authService.signupUser(email, password).then( (data: string) => {
      this.token = data;
      console.log(this.token);
      let str: string = '' + this.token + '';
      console.log(str);
      const res = this.authService.hasDigitInString(str);
      console.log(res);
      if(res) {
        this.router.navigate(['/home']);
      }
    });
  }
}
