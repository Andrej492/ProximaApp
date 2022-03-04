import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../user/auth.service';
import { User } from '../user/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  logSub: Subscription;
  token: string;
  tokenSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.logSub = this.authService.isLogged.subscribe(loginRes => {
      this.isAuthenticated = loginRes;
    });
    this.tokenSub = this.authService.tokenFromLogin.subscribe((token: string) => {
      this.token = token;
    });
  }

  ngOnDestroy(): void {
    this.logSub.unsubscribe();
  }

}
