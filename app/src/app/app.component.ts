import { Component } from '@angular/core';
import { SellerService } from './seller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  // constructor(private seller:SellerService){}
  ngOnInit():void{
    // this.seller.relodseller()
  }
}
