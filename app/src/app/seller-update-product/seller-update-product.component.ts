import { Component, OnInit } from '@angular/core';
import { FormControl,Validators,FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Route,Router } from '@angular/router';
import { ProductServiceService } from '../product-service.service';
import { product } from '../data type';
@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit{
  myform!: FormGroup;
  productData!: product;
product!: product;
productMessage:undefined|string;
  productList: any;
 


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductServiceService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.myform = this.fb.group({
      Name: ['', Validators.required],
      productprice: ['', Validators.required],
      productcategory: ['', Validators.required],
      productdescription: ['', Validators.required],
      productimageURL: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.productService.getproduct(productId).subscribe((data: product) => {
          this.productData = data;
          this.myform.patchValue({
            Name: this.productData.Name,
            productprice: this.productData.productprice,
            productcategory: this.productData.productcategory,
            productdescription: this.productData.productdescription,
            productimageURL: this.productData.productimageURL
          });
          
        });
      }
    });
  }
  // savedata(data:product){
  //   if(this.productData){
  //     data.id=this.productData.id;
  //   }
  //   this.productService.updateproduct(this.myform.value).subscribe((result)=>{
  //     if(result){
  //       this.productMessage = 'product has updated';
  //     }
  //   })
  //   setTimeout(()=>{
  //     this.productMessage = 'product has updated';
  //     },3000);
  // }
  savedata() {
    debugger
    if (this.productData) {
      // data.id = this.productData.id;
    }
    this.productService.updateproduct(this.productData.id, this.myform.value).subscribe(
      (updatedProduct) => {
        if (updatedProduct) {
          this.productMessage = 'Product has been updated successfully.';
          this.updateProductList();
        }
   
      },
      (error) => {
        console.error('Error updating product:', error);
        // Handle error cases, show error message to the user
      }
    );
  }
  
  updateProductList() {
    this.productService.productlist().subscribe((result: any) => {
      this.productList = result;
    });
  }
  
  

}
