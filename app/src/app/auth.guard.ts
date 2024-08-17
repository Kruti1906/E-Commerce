// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
// import { SellerService } from './seller.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private sellerservice:SellerService){}
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//       if(localStorage.getItem('seller')){
//         console.log("")
//         return true;
//       }
//     return this.sellerservice.isSellerLoggedIn;
//   }
  
// }

import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SellerService } from './seller.service';

// @Injectable({
//   providedIn: 'root'
// })
// // export class AuthGuard implements CanActivate {

// //   constructor(private Auth :SellerService, private router : Router){

// //   }
// //   canActivate(
// //     route: ActivatedRouteSnapshot,
// //     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
   
// //       if (!this.Auth.isloggedIn){
// //         return this.router.createUrlTree(['/seller-auth']);
// //       }else {
// //         return true

// //       }
// //   }
// // }

export const AuthGuard: CanActivateFn = (route, state) => {
  const loginService = inject(SellerService);
  const router = inject(Router);

  if (!localStorage.getItem('token')){
    return router.createUrlTree(['/seller-auth']);
  }else {
    return true
  }
};