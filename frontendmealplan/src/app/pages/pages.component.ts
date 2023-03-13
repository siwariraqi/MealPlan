import { Component, OnInit, ViewChild, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Settings, AppSettings } from '../app.settings';
import { isPlatformBrowser } from '@angular/common';
import { AppService } from '../app.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  @ViewChild('sidenav') sidenav:any;   
  public headerTypes = ['default', 'image', 'carousel', 'video'];
  public headerTypeOption:string = ''; 
  public headerFixed: boolean = false;
  public showBackToTop: boolean = false;
 
  public settings: Settings;
  constructor(public appSettings:AppSettings, 
              public router:Router, 
              @Inject(PLATFORM_ID) private platformId: Object, 
              public appService:AppService) {
    this.settings = this.appSettings.settings;  
  } 

  ngOnInit() {    
    this.headerTypeOption = this.settings.header;
    this.getCategories();  
  }
  
  public changeTheme(theme:string){
    this.settings.theme = theme;       
  }


  public chooseHeaderType(){
    this.settings.header = this.headerTypeOption;    
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0,0);
    } 
    this.router.navigate(['/']);
  }
 

  @HostListener('window:scroll') onWindowScroll() {
    const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
    (scrollTop > 300) ? this.showBackToTop = true : this.showBackToTop = false; 

    if(this.settings.stickyMenuToolbar){      
      let top_toolbar = document.getElementById('top-toolbar');
      if(top_toolbar){ 
        if(scrollTop >= top_toolbar.clientHeight) {
          this.settings.mainToolbarFixed = true;
        }
        else{
          if(!document.documentElement.classList.contains('cdk-global-scrollblock')){
            this.settings.mainToolbarFixed = false;
          }  
        } 
      }        
    } 
  }

  public scrollToTop(){
    var scrollDuration = 200;
    var scrollStep = -window.pageYOffset  / (scrollDuration / 20);
    var scrollInterval = setInterval(()=>{
      if(window.pageYOffset != 0){
         window.scrollBy(0, scrollStep);
      }
      else{
        clearInterval(scrollInterval); 
      }
    },10);
    if(window.innerWidth <= 768){
      setTimeout(() => { 
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo(0,0);
        }
      });
    }
  }

  ngAfterViewInit(){
    if(document.getElementById('preloader')){
      document.getElementById('preloader')?.classList.add('hide');
    } 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {        
        this.sidenav.close();
        this.settings.mainToolbarFixed = false;
        setTimeout(() => {
          if (isPlatformBrowser(this.platformId)) {
            window.scrollTo(0,0);
          } 
        }); 
      }            
    });    
  } 

  public getCategories(){  
    if(this.appService.Data.categories.length == 0) { 
      this.appService.getCategories().subscribe(data => { 
        this.appService.Data.categories = data;
      });
    } 
  }

}
