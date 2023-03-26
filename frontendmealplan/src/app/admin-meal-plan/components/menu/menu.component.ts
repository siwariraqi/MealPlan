import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { AppSettings, Settings } from '../../../app.settings'; 
import { Menu } from './menu.model';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ MenuService ]
})
export class MenuComponent implements OnInit {
  @Input('menuItems') menuItems:Menu[] = [];
  @Input('menuParentId') menuParentId = 0;
  parentMenu:Array<any> = [];
  public settings: Settings;
  constructor(public appSettings:AppSettings, public menuService:MenuService) { 
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {     
    this.parentMenu = this.menuItems.filter(item => item.parentId == this.menuParentId);  
  }

  onClick(menuId:number){
    this.menuService.toggleMenuItem(menuId);
    this.menuService.closeOtherSubMenus(this.menuItems, menuId);    
  }

}
