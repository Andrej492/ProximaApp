import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { User } from "./user.model";
import * as $ from 'jquery';

@Injectable({ providedIn: 'root'})
export class AuthService {
  private users: User[] = [];
  user: User;
  usersChanged: Subject<User[]> = new Subject<User[]>();
  isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  tokenFromLogin: Subject<string> = new Subject<string>();

  constructor() {}

  getUsers(token: string) {
    fetch('https://reqres.in/api/users?page=2', {
      headers: new Headers({
        'Authorization': token
      })
    })
    .then(response => response.json())
    .then(res => {
      this.users = res.data;
      this.usersChanged.next([...this.users]);
    })
    .catch(err => console.log(err));
  }

  getUser(index: number): User {
    let userReturn: User;
    userReturn = this.users[index];
    return userReturn;
  }

  signinUser(email: string, password: string) {
    let data = {
      email: email,
      password: password
    };
    fetch('https://reqres.in/api/login', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
      }),
      body: JSON.stringify(data)
      }
    )
    .then(response => response.json())
    .then(data => {
      this.tokenFromLogin.next(data);
      this.isLogged.next(true);
      console.log('Success:');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  signupUser(email: string, password: string) {
    let data = {
      email: email,
      password: password
    };
    fetch('https://reqres.in/api/register', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
      }),
      body: JSON.stringify(data)
      }
    )
    .then(response => response.json())
    .then(data => {
      const token = data.token;
      console.log(token);
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
}
