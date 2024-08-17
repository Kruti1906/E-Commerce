import { Injectable } from '@angular/core';
import{ HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { login, signup } from './data type';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  next(arg0: boolean) {
    throw new Error('Method not implemented.');
  }
 isSellerLoggedIn=new BehaviorSubject<boolean>(false);
  isellerloggedin: any;
  // router: any;
  constructor(private http: HttpClient,private router:Router) { }
  // userSignUp(data: any){
  //   this.http.post('http://localhost:3000/seller',data,{observe:'response'}).subscribe((result)=>{
  //     this.isSellerLoggedIn.next(true);
  //     localStorage.setItem('seller',JSON.stringify(result.body))
  //     this.router.navigate(['seller-home']);
  //     console.warn('result',result);
  //   });
  //   return false;
  // }

  userSignUp(userData: any) {
    return this.http.post<any>('http://localhost:3000/users', userData);
  }
  reloadseller(){
    if(localStorage.getItem('seller')){
      this.isellerloggedin.next(true);
      this.router.navigate(['seller-home']);
    }
  }
  userLogin(data:any){
    console.warn(data)
    return this.http.get<any>('http://localhost:3000/seller',data)
  }

  isloggedIn(): boolean{
    debugger
    return !!localStorage.getItem('seller')
}
getUsers() {
  return this.http.get('http://localhost:3000/user');
}

}
