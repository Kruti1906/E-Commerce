import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Validators,FormControl,FormBuilder } from '@angular/forms';
import { login } from '../data type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit{
 Service: any;
 isuserloggedin: any;
  userForm: any;
  userservice: any;
  router: any;
  loginForm: any;
showLogin: any;

  
  
  constructor(private user:UserService,private formBuilder: FormBuilder,private route:Router){}
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      uname: ['', Validators.required], // Add validators if needed
      psw: ['', Validators.required],
      email: ['', Validators.required]
    });
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      psw: ['', Validators.required]
    }); 
}
// onsubmit(){
//   console.log(this.userForm.value);
//   this.user.userSignUp(this.userForm.value).subscribe((result: any)=>{
//     // console.log(result)
//     if(result){
//       localStorage.setItem('user',JSON.stringify(result.body))
//       this.route.navigate(['/']);
//     }
//   })
// }

onsubmit(){
  console.log(this.userForm.value);
  this.user.userSignUp(this.userForm.value).subscribe((result: any)=>{
    console.log(result)
    if(result){
      this.user['next'](true);
      localStorage.setItem('user',JSON.stringify(this.userForm.value))
      this.route.navigate(['/']);
    }
  })
}
reloaduser(){
  if(localStorage.getItem('user')){
    this.isuserloggedin.next(true);
    this.route.navigate(['/']);
  }
}
opensignin(){
this.showLogin=true 
}
openlogin(){
  this.showLogin=false
}
onlogin(email:string,psw:any){
  console.log(this.userForm.value);
  // this.seller.userLogin(data)
  if (email === 'kruti@gmail.com' && psw === '1234') {
    localStorage.setItem('isuserloggedin', 'true');
    this.route.navigate(['/']); // Navigate to gallery component or another protected route
  } else {
    localStorage.setItem('isuserloggedin', 'false');
    alert('Invalid credentials'); // Notify user of invalid login attempt
  }
}
}