import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from '../product-service.service';
import { product } from '../data type';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productData:undefined|product;
  productId: any;
  productQuantity:number = 1
  removeCart: boolean| undefined;
  cartData:product|undefined
  constructor(private route:ActivatedRoute,private product:ProductServiceService,private router:Router){}
  ngOnInit(): void {
    this.route.params.subscribe(id => {
      this.productId = id['productId']
    });
    console.log("id",this.productId);
    
     this.product.getproduct(this.productId).subscribe((result)=>{
      console.log("result",result);
      
    this.productData=result;


    let cartData=localStorage.getItem('localCart');
    if(this.productId && cartData){
      let item= JSON.parse(cartData);
      item = item.filter((item:product)=>this.productId== item.id.tostring())
      if(item.length){
        this.removeCart=true
      }else{
        this.removeCart=false
      }
    }

    let user=localStorage.getItem('user');
    if(user){
      let userId=user && JSON.parse(user).id
      this.product.getCartList(userId);
      this.product.cartData.subscribe((result)=>{
      let item =  result.filter((item:product)=>this.productId?.toString()===item.productId.toString())
      if(item.length){
        this.cartData=item[0];
        this.removeCart=true
      }
      })
    }
    })
  }
  // handleQuantity(val:string){
  // if(this.productQuantity<20 && val==='plus'){
  //   this.productQuantity+=1
  // }else if(this.productQuantity>1 && val==='min'){
  //   this.productQuantity-=1
  // }
  // }

  handleQuantity(val: 'plus' | 'min'): void {
    if (val === 'plus' && this.productQuantity < 20) {
      this.productQuantity += 1;
    } else if (val === 'min' && this.productQuantity > 1) {
      this.productQuantity -= 1;
    }
  }

  productCount: number = 0;

  AddToCart(){
    this.removeCart = true;
    this.productCount += this.productQuantity;
    this.product.sendData(this.productCount);
  }
  // removeToCart(productId:any){
  //   if(!localStorage.getItem('user')){
  //   this.product['removeItemFormCart'](productId)
  //   this.removeCart=false
  //   }else{
  //     console.log(this.cartData)
  //   }
  // }
  removeToCart(productId: any) {
   this.removeCart = false;
   this.productCount -= this.productQuantity;
   this.product.sendData(this.productCount);
  
  }
  back(){
    this.router.navigate(['/'])
  }
}
