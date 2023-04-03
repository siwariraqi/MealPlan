import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/app.service";
import { User } from "src/app/mealplan/models/User";
import { AuthService } from "src/app/mealplan/services/auth.service";

@Component({
  selector: "app-user-menu",
  templateUrl: "./user-menu.component.html",
  styleUrls: ["./user-menu.component.scss"],
})
export class UserMenuComponent implements OnInit {
  currentUser: User;
  constructor(public appService: AppService, private authSrv: AuthService) {}

  ngOnInit() {
    this.currentUser = this.authSrv.getUser();
  }

  logout(): void {
    this.authSrv.logout();
  }
}
