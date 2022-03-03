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

  getUsers(token: string): Promise<User[]> {
    return fetch('https://reqres.in/api/users?page=2', {
      headers: new Headers({
        'Authorization': token
      })
    })
    .then(response => response.json())
    .then(res => {
      this.users = res.data;
      this.usersChanged.next([...this.users]);
      return this.users;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  getUser(index: number): User {
    let userReturn: User;
    userReturn = this.users[index];
    return userReturn;
  }

  signinUser(email: string, password: string): Promise<string> {
    return fetch('https://reqres.in/api/login', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
      }),
      body: JSON.stringify({
        email: email,
        password: password
      })
      }
    )
    .then(response =>
      response.json()
    )
    .then(data => {
      console.log(data);
      let str: string = data;
      this.tokenFromLogin.next(str);
      this.isLogged.next(this.hasDigitInString(str));
      return str;
    })
    .catch((error) => {
      console.error('Error:', error);
      return error;
    });
  }

  signupUser(email: string, password: string): Promise<string> {
    return fetch('https://reqres.in/api/register', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
      }),
      body: JSON.stringify({
        email: email,
        password: password
      })
      }
    )
    .then(response => response.json())
    .then(data => {
      const token: string = data.token;
      this.tokenFromLogin.next(token);
      this.isLogged.next(this.hasDigitInString(token));
      return token;
    })
    .catch((error) => {
      console.error('Error:', error);
      return error;
    });
  }

  hasDigitInString(input): boolean{
    let str = input;
    let result: boolean;
    let br: number = 0;
    for( let i = 0; i < str.length; i++){
        if(!isNaN(str.charAt(i)) && !(str.charAt(i) === " ")){
            br++;
        }
    }
    if(br > 0) {
      result = false;
    } else {
      result = true;
    }
    return result;
  }
}
