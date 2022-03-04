import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  isLoading: boolean;
  token: string;
  tokenSub: Subscription;
  isAuthenticated = false;
  logSub: Subscription;
  hasLoadedToken: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.tokenSub = this.authService.tokenFromLogin.subscribe((token: string) => {
      this.hasLoadedToken = false;
      this.token = token;
      this.hasLoadedToken = true;
      this.authService.getUsers(this.token)
      .then((result: User[]) => {
        this.isLoading = true;
        this.users = result;
        this.isLoading = false;
      })
      .catch(err => console.log(err));
    });

    this.logSub = this.authService.isLogged.subscribe(loginRes => {
      this.isAuthenticated = loginRes;
    });
  }

  ngOnDestroy(): void {
      this.getUsersSub.unsubscribe();
      this.logSub.unsubscribe();
      this.tokenSub.unsubscribe();
  }

}
