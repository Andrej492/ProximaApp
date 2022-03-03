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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUsers();
    this.getUsersSub = this.authService.usersChanged.subscribe(res => {
      this.users = res;
      console.log(this.users);
    });
  }

  ngOnDestroy(): void {
      this.getUsersSub.unsubscribe();
  }

}
