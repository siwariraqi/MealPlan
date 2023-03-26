import { Component } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, UrlSegment, NavigationEnd } from "@angular/router"; 
import { Title } from '@angular/platform-browser'; 
import { MenuService } from '../menu/menu.service'; 
import { AppSettings, Settings } from 'src/app/app.settings';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  public pageTitle:string = '';
  public breadcrumbs: {
      name: string;
      url: string
  }[] = [];

  public settings: Settings;
  constructor(public appSettings:AppSettings,
              public router: Router, 
              public activatedRoute: ActivatedRoute,                
              public title:Title, 
              private menuService: MenuService){
      this.settings = this.appSettings.settings; 
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.breadcrumbs = [];                
          this.parseRoute(this.router.routerState.snapshot.root); 
          this.pageTitle = "";
          this.breadcrumbs.forEach(breadcrumb => {
            this.pageTitle += ' > ' + breadcrumb.name;
          })       
          this.title.setTitle(this.settings.name + this.pageTitle);
        }
      });   
  }

  private parseRoute(node: ActivatedRouteSnapshot) { 
    if (node.data['breadcrumb']) {
      if(node.url.length){
        let urlSegments: UrlSegment[] = [];
        node.pathFromRoot.forEach(routerState => {
          urlSegments = urlSegments.concat(routerState.url);
        });
        let url = urlSegments.map(urlSegment => {
          return urlSegment.path;
        }).join('/');
        this.breadcrumbs.push({
          name: node.data['breadcrumb'],
          url: '/' + url
        }) 
      }         
    }
    if (node.firstChild) {
      this.parseRoute(node.firstChild);
    }
  }

  public closeSubMenus(){
    this.menuService.closeAllSubMenus();
  }

}
