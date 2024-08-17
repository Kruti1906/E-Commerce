import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { product } from '../data type';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productList:any[]=[];
  productMessage:undefined|string;
  constructor(private product:ProductServiceService){}
  ngOnInit(): void {
   this.list();     
  }

  deleteproduct(id:any){
    console.log("test id",id)
    this.product.deleteproduct(id).subscribe((result)=>{
      if(result){
      this.productMessage="delete product";
      this.list();
      }
    })
    setTimeout(()=>{
      this.productMessage=undefined
    },3000);
  }
//   list(){
//     this.product.productlist().subscribe((result:any)=>{
//       this.productList = result;
//       console.log(this.productList)
//     })
// }

list() {
  this.product.productlist().subscribe((result: any) => {
    this.productList = result;
    console.log(this.productList);
  });
}

}
