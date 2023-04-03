import { Component, OnInit, Input } from "@angular/core";
import { MenuService } from "../menu.service";
import { Menu } from "../menu.model";
import { AuthService } from "src/app/mealplan/services/auth.service";

@Component({
  selector: "app-vertical-menu",
  templateUrl: "./vertical-menu.component.html",
  styleUrls: ["./vertical-menu.component.scss"],
  providers: [MenuService],
})
export class VerticalMenuComponent implements OnInit {
  @Input("menuParentId") menuParentId = 0;
  public menuItems: Array<Menu> = [];
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
    this.menuItems = this.menuService.getVerticalMenuItems();
    this.menuItems = this.menuItems.filter((item) => item.parentId == this.menuParentId);
    if (!this.isAdmin) {
      this.menuItems = this.menuItems.filter((item) => item.id !== 300);
    }
  }

  onClick(menuId: number) {
    this.menuService.toggleMenuItem(menuId);
    this.menuService.closeOtherSubMenus(this.menuService.getVerticalMenuItems(), menuId);
  }
}
