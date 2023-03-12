import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
import { CartOverviewComponent } from '../cart-overview/cart-overview.component';

@Component({
  selector: 'app-menu-item-hoverable',
  templateUrl: './menu-item-hoverable.component.html',
  styleUrls: ['./menu-item-hoverable.component.scss']
})
export class MenuItemHoverableComponent implements OnInit {
  @Input() menuItem!: MenuItem;
  @Input() onlyImage: boolean = false;
  constructor(public appService:AppService) { }

  ngOnInit(): void {
  }

  public addToCart(){ 
    this.appService.addToCart(this.menuItem, CartOverviewComponent); 
  }

  public onCart(){
    if(this.appService.Data.cartList.find(item=>item.id == this.menuItem.id)){
      return true;
    }
    return false;
  }

  public addToFavorites(){
    this.appService.addToFavorites(this.menuItem);
  }

  public onFavorites(){
    if(this.appService.Data.favorites.find(item=>item.id == this.menuItem.id)){
      return true;
    }
    return false;
  }

}
