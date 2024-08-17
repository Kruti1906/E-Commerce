import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { signup } from './data type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  [x: string]: any;
  isuserloggedin=new BehaviorSubject<boolean>(false);
  // isuserloggedin: any;

  constructor(private http:HttpClient,private route:Router) { }
  userSignUp(userData: any) {
    return this.http.post<any>('http://localhost:3000/user',userData)
}
reloadseller(){
  if(localStorage.getItem('user')){
    this.isuserloggedin.next(true);
    this.route.navigate(['/']);
  }
}
userForm(){
  // console.warn(data)
  return this.http.get('http://localhost:3000/user')
}

isloggedIn(): boolean{
  return !!localStorage.getItem('user')
}

getUsers() {
  return this.http.get('http://localhost:3000/user');
}

}