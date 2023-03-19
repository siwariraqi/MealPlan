import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { element } from "protractor";
import { MenuItem } from "src/app/app.models";
import { AppService } from "src/app/app.service";
import { GroceryList } from "../../models/GroceryList";
import { Plan } from "../../models/Plan";
import { GroceryListService } from "../../services/grocery-list.service";

@Component({
  selector: "app-grocery-list",
  templateUrl: "./grocery-list.component.html",
  styleUrls: ["./grocery-list.component.scss"],
})
export class GroceryListComponent implements OnInit {
  public total: any[] = [];
  public cartItemCount: any[] = [];
  public cartItemCountTotal: number = 0;
  public currentTotalCartCount: number = 0;

  //Code We added START
  public allWeeks = [1, 2, 3, 4];
  public weeksToDisplay = [];
  public groceries: GroceryList[] = [];
  public userId = 1; //should be changed to getting current user
  public weekGroceries = [[], [], [], []];
  public groceriesWeek = [];

  constructor(
    public appService: AppService,
    public snackBar: MatSnackBar,
    private grocerListService: GroceryListService
  ) {}

  ngOnInit(): void {
    this.initGroceries();
    this.weeksToDisplay.push(1);
    //their code
    this.updateCartTotal();
  }

  initGroceries() {
    this.getGroceriesForWeek(1);
  }

  getGroceriesForWeek(week: number) {
    //should not add directly to this.groceries
    this.grocerListService
      .getIngredients(week, this.userId)
      .subscribe((groceriess) => {
        this.groceries = groceriess;
      });
    //this.groceries = this.groceriesWeek;
  }

  hideIngredient(toRemove: GroceryList) {
    const index: number = this.groceries.indexOf(toRemove);
    if (index !== -1) {
      this.grocerListService
        .DeleteIngredient(toRemove.groceryId, this.userId)
        .subscribe((error) => {
          alert("error in deleting");
        });
      this.groceries.splice(index, 1);
    }
  }
  selectAll() {
    this.getGroceriesForWeek(1);
  }

  //Code We added END

  //their functions

  ngDoCheck() {
    if (this.currentTotalCartCount !== this.appService.Data.totalCartCount) {
      this.updateCartTotal();
      this.currentTotalCartCount = this.appService.Data.totalCartCount;
    }
  }

  public updateCartTotal() {
    this.cartItemCountTotal = 0;
    this.appService.Data.cartList.forEach((item) => {
      let price = 0;
      if (item.discount) {
        price = item.price - item.price * (item.discount / 100);
      } else {
        price = item.price;
      }
      this.total[item.id] = item.cartCount * price;
      this.cartItemCount[item.id] = item.cartCount;
      this.cartItemCountTotal += item.cartCount;
    });
  }

  public onQuantityChange(count: number, menuItem: MenuItem) {
    menuItem.cartCount = count;
    if (menuItem.cartCount <= menuItem.availibilityCount) {
      let price = 0;
      if (menuItem.discount) {
        price = menuItem.price - menuItem.price * (menuItem.discount / 100);
      } else {
        price = menuItem.price;
      }
      this.total[menuItem.id] = count * price;
      this.cartItemCount[menuItem.id] = count;
      this.appService.calculateCartTotal();
      this.cartItemCountTotal = 0;
      this.cartItemCount.forEach((value) => {
        this.cartItemCountTotal += value;
      });
      this.appService.Data.totalCartCount = this.cartItemCountTotal;
      this.appService.Data.cartList.forEach((item) => {
        this.cartItemCount.forEach((value, index) => {
          if (item.id == index) {
            item.cartCount = value;
          }
        });
      });
    } else {
      menuItem.cartCount = menuItem.availibilityCount;
      this.snackBar.open(
        "You can not add more items than available. In stock " +
          menuItem.availibilityCount +
          " items and you already added " +
          menuItem.cartCount +
          " item to your cart",
        "×",
        { panelClass: "error", verticalPosition: "top", duration: 5000 }
      );
    }
  }

  public remove(item: MenuItem) {
    const index: number = this.appService.Data.cartList.indexOf(item);
    if (index !== -1) {
      this.appService.Data.cartList.splice(index, 1);
      this.appService.calculateCartTotal();
      this.total.forEach((val) => {
        if (val == this.total[item.id]) {
          this.total[item.id] = 0;
        }
      });
      this.cartItemCountTotal =
        this.cartItemCountTotal - this.cartItemCount[item.id];
      this.appService.Data.totalCartCount = this.cartItemCountTotal;
      this.cartItemCount.forEach((val) => {
        if (val == this.cartItemCount[item.id]) {
          this.cartItemCount[item.id] = 0;
        }
      });
    }
  }

  public clear() {
    this.appService.Data.cartList.length = 0;
    this.appService.Data.totalPrice = 0;
    this.appService.Data.totalCartCount = 0;
  }
}
