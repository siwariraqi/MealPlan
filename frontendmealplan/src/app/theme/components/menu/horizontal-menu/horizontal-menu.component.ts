import { Component, OnInit, Input, ViewChildren, QueryList } from "@angular/core";
import { MenuService } from "../menu.service";
import { Menu } from "../menu.model";
import { MatMenuTrigger } from "@angular/material/menu";
import { AuthService } from "src/app/mealplan/services/auth.service";

@Component({
  selector: "app-horizontal-menu",
  templateUrl: "./horizontal-menu.component.html",
  styleUrls: ["./horizontal-menu.component.scss"],
  providers: [MenuService],
})
export class HorizontalMenuComponent implements OnInit {
  @Input("menuParentId") menuParentId = 0;
  public menuItems: Array<Menu> = [];
  @ViewChildren(MatMenuTrigger) triggers!: QueryList<MatMenuTrigger>;
  isAdmin: boolean;
  constructor(public menuService: MenuService, private authSrv: AuthService) {
    this.isAdmin = false;
  }

  ngOnInit() {
    const user = this.authSrv.getUser();
    if (user && user.email) {
      if (user.userRole == "Admin") {
        this.isAdmin = true;
        console.log("Admin yesss");
      } else if (user.userRole == "User") {
        this.isAdmin = false;
      } else {
        this.isAdmin = false;
      }
    }
    this.menuItems = this.menuService.getHorizontalMenuItems();
    this.menuItems = this.menuItems.filter((item) => item.parentId == this.menuParentId);
    if (!this.isAdmin) {
      this.menuItems = this.menuItems.filter((item) => item.id !== 300);
    }
  }

  public closeOthers(trigger: MatMenuTrigger) {
    const currentIndex: number = this.triggers.toArray().findIndex((t) => t == trigger);
    this.triggers.forEach((menu, index) => {
      if (index != currentIndex) {
        menu.closeMenu();
      }
    });
  }
}
