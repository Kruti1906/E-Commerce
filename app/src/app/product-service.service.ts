import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, product } from './data type';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  [x: string]: any;
  updateProduct(value: any) {
    throw new Error('Method not implemented.');
  }
cartData=new EventEmitter<product[] | []>();
  constructor(private http:HttpClient) { }
  addproduct(data:any){
    console.log("service called")
    return this.http.post('http://localhost:3000/products',data)
  }
  productlist(){
    return this.http.get<product[]>('http://localhost:3000/products')
  }
  deleteproduct(id:any){
  return this.http.delete(`http://localhost:3000/products/${id}`)
  }
  getproduct(id:any){
    return this.http.get<product>(`http://localhost:3000/products/${id}`)
  }
  updateproduct(id: any,  product: any){
    return this.http.put(`http://localhost:3000/products/${id}`,product);
  }
  popularProducts(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=6')
  }
  trendyProducts(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=12')
  }
  searchProducts(query:string){
  return this.http.get<product[]>(`http://localhost:3000/products?${query}`);
  }
  LocalAddToCart(data:any){
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if(!localCart){
    localStorage.setItem('localCart',JSON.stringify([data]));
    this.cartData.emit([data]);
  }else{
    cartData=JSON.parse(localCart);
    cartData.push(data)
    localStorage.setItem('localCart',JSON.stringify(cartData));
  }
  this.cartData.emit(cartData);
  }
  removeItemFronCart(productId:any){
    let cartData=localStorage.getItem('localCart');
    if(cartData){
      let item:product[]=JSON.parse(cartData);
      item=item.filter((item:product)=>productId!==item.id);
      localStorage.setItem('localCart',JSON.stringify(item))
      this.cartData.emit(item);
    }
  }
  addToCart(cartData:cart){
    debugger
    return this.http.post('http://localhost:3000/cart',cartData)
  }
  getCartList(userId:number){
  return this.http.get<product[]>('http://localhost:3000/cart/userId='+userId,
    {observe:'response'}).subscribe((result)=>{
      if(result && result.body){
        this.cartData.emit(result.body);
      }
    })
  }
  removeToCart(cartId:any){
    return this.http.delete('http://localhost:3000/cart/'+cartId)
  }

  private messageSource = new BehaviorSubject<any>(null); // Initialize with an empty string
  currentMessage = this.messageSource.asObservable();

  sendData(data: any) {
    this.messageSource.next(data);
  }


  private menuShow = new BehaviorSubject<any>(null); // Initialize with an empty string
  menuShow$ = this.menuShow.asObservable();

  sendMenuShow(data: any) {
    this.menuShow.next(data);
  }
  currentCart(){
    let userstore = localStorage.getItem('user');
    let userData = userstore && JSON.parse(userstore);
    return this.http.get<cart[]>('http://localhost:3000/cart?userId='+userData.id)
  }

}
