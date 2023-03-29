import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { element } from "protractor";
import { MenuItem } from "src/app/app.models";
import { AppService } from "src/app/app.service";
import { GroceryList } from "../../models/GroceryList";
import { Plan } from "../../models/Plan";
import { DayMealService } from "../../services/day-meal.service";
import { GroceryListService } from "../../services/grocery-list.service";
import { UpdatepopupComponent } from "./updatepopup/updatepopup.component";

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
  public weekGroceries = [[], [], [], []]; //weekGroceries[week] = groceries of week
  public hasWeekGrocery = []; //an array to tell us whether a week is already brought or not
  public combinedGroceries: Map<String, Set<GroceryList>>;
  public plan: Plan;

  clicked: boolean[];

  constructor(
    private dayMealService: DayMealService,
    private dialog: MatDialog,
    private grocerListService: GroceryListService
  ) {}

  public popup(): void {
    const dialogRef = this.dialog.open(UpdatepopupComponent, {
      data: { message: "update your plan to acces this week." },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === "confirm") {
        // user confirmed deletion
        console.log("UPDATE");
      } else {
        console.log("CANCEL");
      }
    });
  }
  validweek(week: number) {
    if (this.plan.length === "14" && (week == 3 || week == 4)) {
      //new component that require to update plan
      this.popup();
    } else {
      this.displayWeek(week);
    }
  }

  displayWeek(week: number) {
    if (this.plan.length === "14" && (week == 3 || week == 4)) {
      //new component that require to update plan
      this.popup();
    }
    this.getGroceriesForWeek(week);
    this.weeksToDisplay.add(week);
    this.filterGroceriesAccordingToWeek();
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
    this.groceries = [];
    this.combinedGroceries.forEach((mapElemnt, combinedString) => {
      let newGroceryList: GroceryList = new GroceryList();
      newGroceryList.amount = 0;
      let first_time = true;
      mapElemnt.forEach((grocery: GroceryList) => {
        if (first_time) {
          newGroceryList.ingredient = grocery.ingredient;
          newGroceryList.unit = grocery.unit;
          first_time = false;
        }
        if (this.weeksToDisplay.has(grocery.week)) {
          newGroceryList.amount += grocery.amount;
        }
      });
      if (newGroceryList.amount > 0) {
        this.groceries.push(newGroceryList);
      }
    });
    /*
    this.groceries = Array.from(this.groceriesSet).filter((groList) => {
      return this.weeksToDisplay.has(groList.week);
    });
    */
  }
  public getPlan() {
    this.dayMealService.getPlan(1).subscribe((plan) => {
      this.plan = plan;
    });
  }

  ngOnInit(): void {
    this.getPlan();
    this.clicked = [false, false, false, false];
    for (var i = 0; i < this.allWeeks.length; i++) {
      this.hasWeekGrocery.push(false);
    }
    this.combinedGroceries = new Map();
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
    this.grocerListService.getIngredients(week).subscribe((groceriess) => {
      this.weekGroceries[week - 1] = groceriess;
      this.mergeWeekGroceries(week);
    });
    this.hasWeekGrocery[week - 1] = true;
  }

  mergeWeekGroceries(week: number) {
    this.weekGroceries[week - 1].forEach((element: GroceryList) => {
      this.groceriesSet.add(element);
      //merging code
      let combinedString: String =
        element.ingredient.productName + "$" + element.unit;

      if (this.combinedGroceries.has(combinedString)) {
        let mapElement = this.combinedGroceries.get(combinedString);
        mapElement.add(element);
        this.combinedGroceries.set(combinedString, mapElement);
      } else {
        let mapElement = new Set();
        mapElement.add(element);
        this.combinedGroceries.set(combinedString, mapElement);
      }
    });
    this.filterGroceriesAccordingToWeek();
  }

  hideIngredient(toRemove: GroceryList) {
    const index: number = this.groceries.indexOf(toRemove);
    let combinedString: String =
      toRemove.ingredient.productName + "$" + toRemove.unit;
    let groceriesToDelete: Set<GroceryList> =
      this.combinedGroceries.get(combinedString);

    if (index !== -1) {
      groceriesToDelete.forEach((grocery) => {
        if (this.weeksToDisplay.has(grocery.week)) {
          this.grocerListService
            .DeleteIngredient(grocery.groceryId)
            .subscribe((error) => {
              alert("error in deleting");
            });
        }
      });
      this.groceries.splice(index, 1);
      this.groceriesSet.delete(toRemove);
    }
  }

  selectAll() {
    this.getGroceriesForWeek(1);
  }
}
