import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/mealplan/services/admin.service';

@Component({
  selector: 'app-change-plan-dialog',
  templateUrl: './change-plan-dialog.component.html',
  styleUrls: ['./change-plan-dialog.component.scss']
})
export class ChangePlanDialogComponent implements OnInit {
 


  ngOnInit(): void {
  }

  constructor( public adminService:AdminService, public dialogRef: MatDialogRef<ChangePlanDialogComponent>
               ,@Inject(MAT_DIALOG_DATA) public data: { userId: number }
    ) { }



      onNoClick(): void {
    this.dialogRef.close();
  }

  selectPlan(planName: string) {
    console.log(`Selected plan: ${planName} for user ${this.data.userId}`);
    this.changePlan(this.data.userId,planName);
    this.dialogRef.close(planName);
    
  }
      
  public changePlan(userId:number,planName:string){
    console.log('siwar')
    this.adminService.updateUserPlan(userId,planName).subscribe();
}

}
