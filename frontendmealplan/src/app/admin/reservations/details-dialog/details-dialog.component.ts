import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reservation } from 'src/app/app.models';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.scss']
})
export class DetailsDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DetailsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public reservation: Reservation) { }

  ngOnInit(): void { }

}
