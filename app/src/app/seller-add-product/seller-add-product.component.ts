import { Component, OnInit } from '@angular/core';
import { FormControl,Validators,FormGroup, FormBuilder } from '@angular/forms';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit{

  myform!: FormGroup;
  data!: object;
  addProductMessage:string|undefined;
addProduct: any;
  constructor(private fb:FormBuilder,private product:ProductServiceService){}
  ngOnInit(): void {
    this.myform = new FormGroup({
      Name : new FormControl('',Validators.required),
      productprice: new FormControl('',[Validators.required]),
      productcategory: new FormControl('',Validators.required),
      productdescription : new FormControl('',Validators.required),
      productimageURL : new FormControl('',Validators.required)
   })

  }

  savedata(){
 console.log(this.myform.value)
 this.product.addproduct(this.myform.value).subscribe((result)=>{
  console.log(result);  
  if(result){
    this.addProductMessage="product is sucessfully added"
  }
  setTimeout(()=>(this.addProductMessage = undefined),3000)
 })
  }

}
