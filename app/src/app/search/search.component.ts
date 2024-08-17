import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data type';
import { ProductServiceService } from '../product-service.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  searchresult:undefined|product[]
  constructor(private activeroute:ActivatedRoute,private product:ProductServiceService){}
  ngOnInit(): void {
    let query=this.activeroute.snapshot.paramMap.get('query');
    query && this.product.searchProducts(query).subscribe((result: any)=>{
      this.searchresult=result
    })
  }

}
