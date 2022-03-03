import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { User } from "./user.model";
import * as $ from 'jquery';

@Injectable({ providedIn: 'root'})
export class AuthService {
  private users: User[] = [];
  user: User;
  usersChanged: Subject<User[]> = new Subject<User[]>();
  apiUrl = 'https://regres.in/users';

  constructor() {}
  getUsers() {
    fetch('https://reqres.in/api/users?page=2')
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

  signinUser(email: string, password: string) {}

  // signupUser(email: string, password: string) {
  //   const userData = new FormData();
  //   userData.append("password", password);
  //   userData.append("email", email);
  //   this.http.post<User>(
  //     'https://reqres.in/api/register',
  //     userData
  //   ).subscribe( result => {
  //     console.log(result);
  //     let userNew: User = result;
  //     this.users.push(userNew);
  //     this.usersChanged.next([...this.users]);
  //     console.log(this.users);
  //   }
  //   );
  // }
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
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
}
