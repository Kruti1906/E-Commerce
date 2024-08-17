import { Component, OnInit } from '@angular/core';
import { SellerService } from '../seller.service';
import { AbstractControl, FormBuilder,FormControl,FormGroup,Validator, ValidatorFn, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { login, product,cart, signup } from '../data type';
import { UserService } from '../user.service';
import { ProductServiceService } from '../product-service.service';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  [x: string]: any;
index:any;
 loginForm!: FormGroup;
 userForm!:FormGroup; 
  isellerloggedin: any;
  showLogin=false;
  signinForm: any;
  formdata!: login;
  userId:any;
  constructor(private formBuilder: FormBuilder,private seller:SellerService,private route:Router,private user:UserService,private product:ProductServiceService){}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      uname: ['', [Validators.required, Validators.pattern(/^\S*$/)]],
      email: ['', [Validators.required, Validators.email]],
      psw: ['', [
        Validators.required, 
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}$')
      ]],
      role: ['', Validators.required]
    });
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      psw: ['', [
        Validators.required, 
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}$')
      ]],
    });
  }

  emailValidator(control: AbstractControl) {
    if (control.value && !control.value.includes('@')) {
      return { invalidEmail: true };
    }
    return null;
  }
  //  passwordValidator(): ValidatorFn {
  //   return (control: AbstractControl) => {
  //     const value = control.value;
  //     // Regular expression to validate the password
  //     const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
  //     if (value && !strongPasswordPattern.test(value)) {
  //       return { invalidPassword: true };
  //     }
  //     return null;
  //   };
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
    // openlogin(){
    // this.showLogin=true 
    // }
    // opensignin(){
    //   this.showLogin=false
    // }
    // onlogin(email:string,psw:any){
    //   console.log(this.signinForm.value);
    //   // this.seller.userLogin(data)
    //   if (email === 'kruti@gmail.com' && psw === '1234') {
    //     localStorage.setItem('isLoggedIn', 'true');
    //     this.router.navigate(['/seller-home']);
    //   } else {
    //     localStorage.setItem('isLoggedIn', 'false');
    //     alert('Invalid credentials'); 
    //   }
    // }



    
    // onsubmit(): void {
    //   console.log(this.loginForm.value);
    //     this.seller.userSignUp(this.loginForm.value).subscribe((result: any) => {
    //       console.log(result);
    //       if (result) {
    //         localStorage.setItem('sellerLoggedIn', 'true');
    //         this.route.navigate(['/seller-home']);
    //       }
    //     });
      
    // }
  
    // openlogin(): void {
    //   this.showLogin = true;
    // }
  
    // opensignin(): void {
    //   this.showLogin = false;
    // }
  
    // onlogin(email: string, psw: string): void {
    //   console.log(this.signinForm.value);
      
    //   if (email === 'seller@example.com' && psw === '1234') {
    //     localStorage.setItem('sellerLoggedIn', 'true');
    //     this.route.navigate(['/seller-home']);
    //   } else if (email === 'user@example.com' && psw === '1234') {
    //     // Example logic for user login
    //     localStorage.setItem('userLoggedIn', 'true');
    //     this.route.navigate(['/']);
    //   } else {
    //     localStorage.setItem('isLoggedIn', 'false');
    //     alert('Invalid credentials');
    //   }
    // }





  onsubmit(): void {
  
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const emailExists = existingUsers.some((user: any) => user.email === this.loginForm.value.email);
  
    if (emailExists) {
      alert('Email already exists. Please use a different email.');
      return; // Exit function if email exists
    }
    this.user.userSignUp(this.loginForm.value).subscribe((result: any)=>{
      console.log(result)
      if(result){
        this.user['next'](true);
        localStorage.setItem('user',JSON.stringify(this.loginForm.value))
        this.route.navigate(['/']);
      }
    })
    const newUser = this.loginForm.value;
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('User registered successfully!');
    this.loginForm.reset();
  }

menushow: boolean = true;

  onlogin() {
    
    this.user.getUsers().subscribe((result: any)=>{
      
     result.forEach((element: any) => {
      if(this.signinForm.value.email == element.email && this.signinForm.value.psw == element.psw) {
        console.log("role", element);
        
        if(element.role == "user") {
          console.log("run");
          
          this.route.navigate(["/"])
          localStorage.setItem("token",element.role);
          
        }
        if(element.role == "seller") {
          console.log("run"); 
          
          this.route.navigate(["/seller-home"])
          localStorage.setItem("token",element.role);
        }
        
      }

      this.product.sendMenuShow(this.menushow)

     });
    })
  }


  // onlogin() {
  //   this.user.getUsers().subscribe((result: any) => {
  //     let loggedIn = false;
  //     result.forEach((element: any) => {
  //       if (this.signinForm.value.email === element.email && this.signinForm.value.psw === element.psw) {
  //         loggedIn = true;
  //         if (element.role === "user") {
  //           this.route.navigate(["/"]);
  //         } else if (element.role === "seller") {
  //           this.route.navigate(["/"]);
  //         }
  //       }
  //     });
  
  //     if (!loggedIn) {
  //       // Handle incorrect email/password combination
  //       console.log("Incorrect email or password");
  //       // You can also show an error message to the user here
  //     }
  //   });
  // }

    // const email = this.signinForm.value.email;
    // const psw = this.signinForm.value.psw;
    // let users = JSON.parse(localStorage.getItem('users') || '[]');
    // const user = users.find((u: any) => u.email === email && u.psw === psw);
    // if (user) {
    //   localStorage.setItem('currentUser', JSON.stringify(user));
    //   localStorage.setItem('isLoggedIn', 'true');
  
    //   if (user.role === 'seller') {
    //     this.route.navigate(['/seller-home']); // Navigate to seller home for seller role
    //   } else {
    //     this.route.navigate(['/']); // Navigate to default home for user role
    //   }
    // } else {
    //   alert('Invalid credentials');
    //   this.localCartToRemoteCart()
    // }
    


   
  openlogin(): void {
    this.showLogin = true;
  }

  opensignin(): void {
    this.showLogin = false;
  }

  localCartToRemoteCart(){
  let data=localStorage.getItem('local cart');
  if(data){
    let cartDataList:product[] = JSON.parse(data);
    let user = localStorage.getItem('user');
    let userId=user && JSON.parse(user).id;
    cartDataList.forEach((product:product)=>{
      let cartData:cart={
        ...product,
        productId:product.id,
        userId
      };
      delete cartData.id,
     setTimeout(()=>{
      this.product.addproduct(cartData).subscribe((result)=>{
        if(result){
          console.log("item stotred in db")
        }
      })
      if(cartDataList.length===this.index+1){
        localStorage.removeItem('localcart');
      }
     },500)
    });
  }
  setTimeout(()=>{
    this.product.getCartList(this.userId);
  },2000);
  }


  public noWhitespaceValidator(control: FormControl) {
    return (control.value || '').trim().length? null : { 'whitespace': true };       
  }
  
}

//   if (user.role === 'seller') {
//     localStorage.setItem('sellerLoggedIn', 'true');
//     this.router.navigate(['/seller-home']);
//   } else {
//     localStorage.setItem('userLoggedIn', 'true');
//     this.router.navigate(['/']);
//   }
// } else {
//   alert('Invalid credentials');
// }