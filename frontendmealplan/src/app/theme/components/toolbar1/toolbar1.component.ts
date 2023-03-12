import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppService } from 'src/app/app.service'; 
import { CartOverviewComponent } from 'src/app/shared/cart-overview/cart-overview.component'; 
import { ReservationDialogComponent } from 'src/app/shared/reservation-dialog/reservation-dialog.component';

@Component({
  selector: 'app-toolbar1',
  templateUrl: './toolbar1.component.html' 
})
export class Toolbar1Component implements OnInit {
  @Output() onMenuIconClick: EventEmitter<any> = new EventEmitter<any>(); 
  constructor(public appService:AppService) { }

  ngOnInit() { }

  public sidenavToggle(){
    this.onMenuIconClick.emit();
  }
  public openCart(){ 
    this.appService.openCart(CartOverviewComponent)
  }
  public reservation(){ 
    this.appService.makeReservation(ReservationDialogComponent, null, true);   
  }
}