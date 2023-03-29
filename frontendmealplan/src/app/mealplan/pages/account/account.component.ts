import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public psConfig: PerfectScrollbarConfigInterface = {
    wheelPropagation:true
  };
  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen:boolean = true;
  public links = [ 
    { name: 'Dashboard', href: 'dashboard', icon: 'dashboard' }, 
    { name: 'Profile', href: 'profile', icon: 'person' },
    { name: 'Password Change', href: 'password-change', icon: 'vpn_key' },  
    { name: 'Account settings', href: 'account-settings', icon: 'settings' } , 
    { name: 'Help & Support', href: 'help-support', icon: 'help' },
    { name: 'About App', href: 'about', icon: 'information' }, 
    { name: 'Privacy Policy', href: 'privacy', icon: 'lock' },
    { name: 'Terms & Conditions', href: 'terms', icon: 'note' },
    { name: 'Logout', href: '/login', icon: 'power_settings_new' }
  ]; 
  constructor(private authService:AuthService,public router:Router,private userService:UserService) { }
  user:User ={};
  name:string;
  firstName:string;
  email:string;
  ngOnInit() {
    this.user = this.authService.getUser();
    this.name=this.user.firstName+" "+this.user.lastName;

    if(window.innerWidth < 960){
      this.sidenavOpen = false;
    };
  }

  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }

  ngAfterViewInit(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {  
        if(window.innerWidth < 960){
          this.sidenav.close(); 
        }
      }                
    });
  } 


}
