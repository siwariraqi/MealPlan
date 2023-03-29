import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AppService } from "src/app/app.service";
import { User } from "src/app/mealplan/models/User";
import { AuthService } from "src/app/mealplan/services/auth.service";
import { CartOverviewComponent } from "src/app/shared/cart-overview/cart-overview.component";
import { ReservationDialogComponent } from "src/app/shared/reservation-dialog/reservation-dialog.component";

@Component({
  selector: "app-toolbar1",
  templateUrl: "./toolbar1.component.html",
  styleUrls: ["./toolbar1.component.scss"],
})
export class Toolbar1Component implements OnInit {
  @Output() onMenuIconClick: EventEmitter<any> = new EventEmitter<any>();
  // isBurgerMenu: boolean;
  isLoggedIn: boolean;
  currentUser: User;
  constructor(public appService: AppService, private authSrv: AuthService) {
    // this.isBurgerMenu = false;
  }

  ngOnInit() {
    if (this.authSrv.getUser() && this.authSrv.getUser().email) {
      this.isLoggedIn = true;
      this.currentUser = this.authSrv.getUser();
    } else {
      this.isLoggedIn = false;
    }
  }

  public sidenavToggle() {
    this.onMenuIconClick.emit();
    // console.log(this.onMenuIconClick);
  }
  // public openCart(){
  //   this.appService.openCart(CartOverviewComponent)
  // }
  // public reservation(){
  //   this.appService.makeReservation(ReservationDialogComponent, null, true);
  // }
}
