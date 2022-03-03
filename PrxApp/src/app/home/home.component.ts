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
  isAuthenticated = false;
  logSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.logSub = this.authService.isLogged.subscribe(loginRes => {
      this.isAuthenticated = loginRes;
      console.log(this.isAuthenticated);
    });
  }

  ngOnDestroy(): void {
    this.logSub.unsubscribe();
  }

}
