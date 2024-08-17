import { Component, OnInit } from '@angular/core';
import { SellerService } from '../seller.service';
import { FormBuilder,FormControl,FormGroup,Validator, Validators } from '@angular/forms';
import { BehaviorSubject, Subscriber } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  // loginForm!: FormGroup;
  // isellerloggedin: any;
  // constructor(private formBuilder: FormBuilder,private seller:SellerService,private router:Router){}
  ngOnInit(): void {
  //   this.loginForm = this.formBuilder.group({
  //     uname: ['', Validators.required], // Add validators if needed
  //     psw: ['', Validators.required],
  //   });
  // }
  // onsubmit(){
  //   console.log(this.loginForm.value);
  //   this.seller.userSignUp(this.loginForm.value).subscribe((result: any)=>{
  //     console.log(result)
  //     if(result){
  //       this.seller.isSellerLoggedIn.next(true);
  //       localStorage.setItem('seller',JSON.stringify(this.loginForm.value))
  //       this.router.navigate(['seller-home']);
  //     }
  //   })
  // }
  // reloadseller(){
  //   if(localStorage.getItem('seller')){
  //     this.isellerloggedin.next(true);
  //     this.router.navigate(['seller-home']);
  //   }
  // }
}
}