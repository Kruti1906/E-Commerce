import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServiceService } from '../product-service.service';
import { product } from '../data type';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menuType:string ='default';
  sellerName:string = '';
  isLoggedInName: any;
  searchresult:any|product[];
  searchResult:undefined | product;
  cartItems=0;
  userName: any;
  userdata:any
  count: any;
  user!: boolean;
  seller!: boolean;
  constructor(private route:Router,private product:ProductServiceService){}

  ngOnInit(): void {

    let role = localStorage.getItem("token");

    if(role == "user") {
      this.user = true;
      this.seller = false
    } else if(role == "seller") {
      this.seller = true;
      this.user = false;
    } else {
      this.seller = false;
      this.user = false;
    }

    

    this.product.menuShow$.subscribe(data => {
      this.menuShow();
    })

    
    
    
    this.product.currentMessage.subscribe(data => {
      this.count = data;
    })

  this.route.events.subscribe((val: any) => {
    if (val.url) {
      // Check if user is logged in and in seller area
      if (localStorage.getItem('seller') && val.url.includes('seller')) {
        console.log("In seller area");
        this.menuType = 'seller';
        if(localStorage.getItem('seller')){
        let sellerstore=localStorage.getItem('seller');
        let sellerdata= sellerstore&& JSON.parse(sellerstore)[0];
        this.sellerName=sellerdata.name;  

  }  
      } else if(localStorage.getItem('user')){
        // console.log("Outside seller area");
        this.menuType = 'user';
        let userstore=localStorage.getItem('user');
        let sellerdata= userstore&& JSON.parse(userstore)[0];
        this.userName=this.userdata.name; 
      }
      else{
        this.menuType = 'default';
      }

      
    }
  });
  let cartData = localStorage.getItem('local cart');
  if(cartData){
    this.cartItems=JSON.parse(cartData).length
  }
  this.product.cartData.subscribe((item)=>{
    this.cartItems=item.length
  })
}
homeMenu: boolean = true;

menuShow() {
  const token = localStorage.getItem("token");
  
    if(token == "seller") {
      this.seller = true;
      this.homeMenu = false;
      this.user = false;
    } else if (token == "user") {
      this.seller = false;
      this.homeMenu = false;

      this.user = true;
    }

}

shutter() {
  this.homeMenu = true;
  this.seller = false;
  this.user = false;
}

logout(){
  localStorage.removeItem('isLoggedIn');
  this.route.navigate(['/']);
}
userlogout(){
  localStorage.removeItem('token');
  this.route.navigate(['/seller-auth']);
  this.seller = false;
  this.homeMenu = true;
  this.user = false
  this.product.cartData.emit([]);
}
// searchProducts(query:KeyboardEvent){
// if(query){
//   const element= query.target as HTMLInputElement;
//   console.log(element.value)
//   this.product.searchProducts(element.value).subscribe((result)=>{
//     if(result.length>3){
//       result.length=3;
//     }

//   this.searchresult=result;
//   })
// }
// }

searchProducts(query: string): void {
  if (query.trim()) {
    this.product.searchProducts(query).subscribe((result: product[]) => {
      if(result.length>3){
              result.length=3;
          }// Limit to first 3 results
    });
  } else {
    this.searchResult = undefined;
  }
}

hideSearch(): void {
  this.searchResult = undefined;
}

// hidesearch(){
//   this.searchresult=undefined
// }
// submitsearch(val:string){
//   this.route.navigate([`search/${val}`])
// }

submitSearch(query: string): void {
  if (query.trim()) {
    this.route.navigate([`search/${query}`]);
  }
}
redirectToDetails(id:number){
this.route.navigate(['/details/'+id])
}
navigateToSearch(query: string): void {
  this.route.navigate([`search/${query}`]);
}
}
    
  


