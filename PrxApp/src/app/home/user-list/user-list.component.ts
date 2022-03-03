import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/user/auth.service';
import { User } from 'src/app/user/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  getUsersSub: Subscription;
  users: User[] = [];
  token: string = '';
  tokenSub: Subscription;
  isAuthenticated = false;
  logSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.tokenSub = this.authService.tokenFromLogin.subscribe(token => {
      this.token = token;
      this.authService.getUsers(token);
    })
    this.getUsersSub = this.authService.usersChanged.subscribe(res => {
      this.users = res;
      console.log(this.users);
    });
    this.logSub = this.authService.isLogged.subscribe(loginRes => {
      this.isAuthenticated = loginRes;
    });
  }

  ngOnDestroy(): void {
      this.getUsersSub.unsubscribe();
      this.tokenSub.unsubscribe();
      this.logSub.unsubscribe();
  }

}
