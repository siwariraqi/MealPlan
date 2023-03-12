import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit { 

  constructor(public dialogRef: MatDialogRef<AlertDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public message:string) { }

  ngOnInit(): void {
  }

  close(): void { 
    this.dialogRef.close();
  }

}
