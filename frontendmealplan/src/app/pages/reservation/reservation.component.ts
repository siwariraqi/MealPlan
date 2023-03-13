import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  constructor(public appService:AppService) { }

  ngOnInit(): void {
  }

  public onMakeReservation(event:any){ 
    this.appService.makeReservation(null, event.value, false);
  }

}
