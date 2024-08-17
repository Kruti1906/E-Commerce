import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { cart } from '../data type';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.css']
})
export class AddCartComponent implements OnInit {
  cartData:cart[]|undefined;
  constructor(private product:ProductServiceService){}
  ngOnInit(): void {
  //   this.product.currentCart().subscribe((result)=>{
  //     this.cartData=result
  //   })
  // }

}
}