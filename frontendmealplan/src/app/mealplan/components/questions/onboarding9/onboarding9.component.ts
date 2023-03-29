import { Component, OnInit } from "@angular/core";
import { RegisterService } from "src/app/mealplan/services/register.service";

@Component({
  selector: "app-onboarding9",
  template: `
    <style>
      .box:hover {
        background: #e09167;
      }
    </style>
    <div class="container">
      <div class="top">
        <p class="question">Have you been diagnosed with or received treatment for diabetes?</p>
        <p class="line"></p>
      </div>
      <div class="content">
        <!-- box1 -->
        <div class="box-answers" (click)="booleanAnswer('yes')" [ngClass]="{ green: isReceiveTreatment === true }">
          <div class="text">Yes</div>
        </div>

        <!-- box2 -->
        <div class="box-answers" (click)="booleanAnswer('no')" [ngClass]="{ green: isReceiveTreatment === false }">
          <div class="text">No</div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./onboarding9.component.scss"],
})
export class Onboarding9Component implements OnInit {
  isReceiveTreatment: boolean;
  valid: boolean;

  constructor(private registerSrv: RegisterService) {
    this.isReceiveTreatment = undefined;
    this.valid = false;
  }

  ngOnInit(): void {
    const userInfo = this.registerSrv.getUserInfo();
    if (userInfo && userInfo.infoId) {
      if (userInfo.isReceiveTreatment !== null && userInfo.isReceiveTreatment !== undefined) {
        this.isReceiveTreatment = userInfo.isReceiveTreatment;
        this.booleanAnswer(this.isReceiveTreatment ? "yes" : "no");
      }
    }
  }

  booleanAnswer(ans: string) {
    ans === "yes" ? (this.isReceiveTreatment = true) : (this.isReceiveTreatment = false);
    this.registerSrv.getUserInfo().isReceiveTreatment = this.isReceiveTreatment;
    if (this.isReceiveTreatment == undefined) this.valid = false;
    else if (this.isReceiveTreatment == true || this.isReceiveTreatment == false) this.valid = true;
  }
}
