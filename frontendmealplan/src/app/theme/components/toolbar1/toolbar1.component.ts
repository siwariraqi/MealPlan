import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from "@angular/core";
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
  isLoggedIn: boolean;
  currentUser: User;
  constructor(public appService: AppService, private authSrv: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.authSrv.getUser$().subscribe((user) => {
      this.currentUser = user;
      this.cdr.detectChanges();
    });
    this.authSrv.isLoggedIn$().subscribe((isLoggedIn) => {
      console.log(isLoggedIn + "gggggggggggggg")
      this.isLoggedIn = isLoggedIn;
      this.cdr.detectChanges();
    });
  }

  public sidenavToggle() {
    this.onMenuIconClick.emit();
  }

  public getUser() {
    return this.authSrv.getUser();
  }
}
