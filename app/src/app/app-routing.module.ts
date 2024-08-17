import { Component, NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AddCartComponent } from './add-cart/add-cart.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SearchComponent } from './search/search.component';
import { UserAuthComponent } from './user-auth/user-auth.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'seller-auth',component:SellerAuthComponent},
  {path:'login',component:LoginComponent},
  {path:'add-cart',component:AddCartComponent},
  {path:'seller-home',component:SellerHomeComponent},
  {path:'seller-add-product',component:SellerAddProductComponent,canActivate:[AuthGuard]},
  {path:'seller-update-product/:id',component:SellerUpdateProductComponent,canActivate:[AuthGuard]},
  {path:'details/:productId',component:ProductDetailComponent},
  {path:'search/:query',component:SearchComponent},
  {path:'user-auth',component:UserAuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
