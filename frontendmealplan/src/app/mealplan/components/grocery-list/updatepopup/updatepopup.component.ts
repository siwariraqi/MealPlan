import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
  selector: "app-updatepopup",
  templateUrl: "./updatepopup.component.html",
  styleUrls: ["./updatepopup.component.scss"],
})
export class UpdatepopupComponent implements OnInit {
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<UpdatepopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}
  ngOnInit(): void {
    console.log("POP");
  }

  onConfirmClick(): void {
    this.router.navigate(["/mealplan/chooseplan"]);
    this.dialogRef.close("choose");
  }

  onCancelClick(): void {
    this.dialogRef.close("cancel");
  }
}
