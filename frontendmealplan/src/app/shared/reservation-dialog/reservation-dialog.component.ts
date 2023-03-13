import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.scss']
})
export class ReservationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ReservationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  public onMakeReservation(event:any){
    console.log('event: ', event);
    this.dialogRef.close(event.value);
  }
}
