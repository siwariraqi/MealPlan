import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from '../menu.service';
import { Menu } from '../menu.model';

@Component({
  selector: 'app-vertical-menu',
  templateUrl: './vertical-menu.component.html',
  styleUrls: ['./vertical-menu.component.scss'],
  providers: [ MenuService ]
})
export class VerticalMenuComponent implements OnInit {
  @Input('menuParentId') menuParentId = 0;
  public menuItems: Array<Menu> = [];
  constructor(public menuService:MenuService) { }

  ngOnInit() {
    this.menuItems = this.menuService.getVerticalMenuItems();
    this.menuItems = this.menuItems.filter(item => item.parentId == this.menuParentId);
  }

  onClick(menuId:number){
    this.menuService.toggleMenuItem(menuId);
    this.menuService.closeOtherSubMenus(this.menuService.getVerticalMenuItems(), menuId);    
  }

}
