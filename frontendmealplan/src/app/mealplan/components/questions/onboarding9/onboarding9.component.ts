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
        <div
          class="box-answers"
          (click)="booleanAnswer('yes')"
          [ngClass]="{ green: isReceiveTreatment === true }"
        >
          <div class="text">Yes</div>
        </div>

        <!-- box2 -->
        <div
          class="box-answers"
          (click)="booleanAnswer('no')"
          [ngClass]="{ green: isReceiveTreatment === false }"
        >
          <div class="text">No</div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./onboarding9.component.scss"],
})
export class Onboarding9Component implements OnInit {
  isReceiveTreatment: boolean;

  constructor(private registerSrv: RegisterService) {
    this.isReceiveTreatment = undefined;
  }

  ngOnInit(): void {}

  booleanAnswer(ans: string) {
    ans === "yes" ? (this.isReceiveTreatment = true) : (this.isReceiveTreatment = false);
    this.registerSrv.getUserInfo().isReceiveTreatment = this.isReceiveTreatment;
  }
}
