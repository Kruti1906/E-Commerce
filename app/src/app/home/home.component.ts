import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { product } from '../data type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularProducts:undefined|product[]
  trendyProducts:undefined|product[]
constructor(private product:ProductServiceService){}
ngOnInit(): void {
  this.product.popularProducts().subscribe((data)=>{
    console.log(data);
    this.popularProducts=data;
  });
  this.product.trendyProducts().subscribe((data)=>{
  console.log(data);
  this.trendyProducts=data
  })
  }
}

