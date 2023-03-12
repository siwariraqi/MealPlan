import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';
import { MenuService } from '../menu.service';
import { Menu } from '../menu.model';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-horizontal-menu',
  templateUrl: './horizontal-menu.component.html',
  styleUrls: ['./horizontal-menu.component.scss'],
  providers: [ MenuService ]
})
export class HorizontalMenuComponent implements OnInit {
  @Input('menuParentId') menuParentId = 0;
  public menuItems: Array<Menu> = []; 
  @ViewChildren(MatMenuTrigger) triggers!: QueryList<MatMenuTrigger>;

  constructor(public menuService:MenuService) { }

  ngOnInit() {
    this.menuItems = this.menuService.getHorizontalMenuItems();
    this.menuItems = this.menuItems.filter(item => item.parentId == this.menuParentId); 
  }

  public closeOthers(trigger:MatMenuTrigger){ 
    const currentIndex: number = this.triggers.toArray().findIndex(t => t == trigger); 
    this.triggers.forEach((menu, index) => {
      if(index != currentIndex){
        menu.closeMenu();
      }
    });
  }

}
