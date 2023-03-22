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
  //Code We added START
  public AllCatagories = ["Dairy", "Meat", "Fruit", "Vegetables", "Others"];
  public allWeeks = [1, 2, 3, 4];
  public weeksToDisplay = new Set(); //weeks the user clicked
  public groceries: GroceryList[] = []; //groceris we iterate over in html (final)
  public groceriesSet: Set<GroceryList> = new Set(); //all groceries to make sure we dont add duplicates
  public userId = 1; //should be changed to getting current user
  public weekGroceries = [[], [], [], []]; //weekGroceries[week] = groceries of week
  public hasWeekGrocery = []; //an array to tell us whether a week is already brought or not

  clicked: boolean[];

  constructor(private grocerListService: GroceryListService) {}

  displayWeek(week: number) {
    this.getGroceriesForWeek(week);
    this.weeksToDisplay.add(week);
    this.filterGroceriesAccordingToWeek();
    //get the groceries for the week
    /*
    this.clicked[2] = true;
    if (this.weeksToDisplay.has(week)) {
      this.weeksToDisplay.delete(week);
    } else {
      // get the groceries for the week
      this.getGroceriesForWeek(week);
      this.weeksToDisplay.add(week);
    }
    this.filterGroceriesAccordingToWeek();
    */
  }
  hideWeek(week: number) {
    this.weeksToDisplay.delete(week);
    this.filterGroceriesAccordingToWeek();
  }
  weekClicked(week: number) {
    if (this.clicked[week - 1]) {
      this.hideWeek(week);
      this.clicked[week - 1] = false;
    } else {
      this.displayWeek(week);
      this.clicked[week - 1] = true;
    }
  }

  filterGroceriesAccordingToWeek() {
    //this.groceries = [];
    this.groceries = Array.from(this.groceriesSet).filter((groList) => {
      return this.weeksToDisplay.has(groList.week);
    });
  }

  ngOnInit(): void {
    this.clicked = [false, false, false, false];
    for (var i = 0; i < this.allWeeks.length; i++) {
      this.hasWeekGrocery.push(false);
    }
    this.initGroceries();
  }

  initGroceries() {
    this.weekClicked(1);
  }

  getGroceriesForWeek(week: number) {
    if (this.hasWeekGrocery[week - 1]) {
      this.mergeWeekGroceries(week);
      return;
    }
    this.grocerListService
      .getIngredients(week, this.userId)
      .subscribe((groceriess) => {
        this.weekGroceries[week - 1] = groceriess;
        this.mergeWeekGroceries(week);
      });
    this.hasWeekGrocery[week - 1] = true;
  }

  /*
  getGroceriesForWeek(week: number) {
    if (this.hasWeekGrocery[week - 1]) return;
    if (this.weekGroceries[week - 1].length === 0) {
      this.grocerListService
        .getIngredients(week, this.userId)
        .subscribe((groceriess) => {
          this.weekGroceries[week - 1] = groceriess;
          this.mergeWeekGroceries(week);
        });
    } else {
      this.mergeWeekGroceries(week);
    }
  }
  */

  mergeWeekGroceries(week: number) {
    this.weekGroceries[week - 1].forEach((element) => {
      this.groceriesSet.add(element);
    });
    this.groceries = Array.from(this.groceriesSet);
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
      this.groceriesSet.delete(toRemove);
    }
  }

  selectAll() {
    this.getGroceriesForWeek(1);
  }
}