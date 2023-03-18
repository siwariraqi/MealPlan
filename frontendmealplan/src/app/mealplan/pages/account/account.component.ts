import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { User } from '../../models/User';
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
    { name: 'Addresses', href: 'addresses', icon: 'location_on' }, 
    { name: 'Favorites', href: 'favorites', icon: 'favorite' }, 
    { name: 'Reservations', href: 'reservations', icon: 'event' },
    { name: 'Orders', href: 'orders', icon: 'list_alt' },  
    { name: 'Logout', href: '/login', icon: 'power_settings_new' },    
  ]; 
  constructor(public router:Router,private userService:UserService) { }
  user:User ={};
  name:string;
  firstName:string;
  email:string;
  ngOnInit() {
    localStorage.setItem('userId','2');//to be removed after integration
    this.userService.getUser(Number(localStorage.getItem('userId'))).subscribe(
      data => {
         this.user = data;
         this.name=this.user.firstName+" "+this.user.lastName;
      },
      error => console.error('Error fetching user:', error)
   );
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
