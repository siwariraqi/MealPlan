import { Component, OnInit } from "@angular/core";
import { RegisterService } from "src/app/mealplan/services/register.service";

@Component({
  selector: "app-onboarding11",
  template: `
    <style>
      .box:hover {
        background: #e09167;
      }
    </style>
    <div class="container">
      <div class="top">
        <p class="question">what's your gender?</p>
        <p class="line"></p>
      </div>
      <div class="content">
        <!-- box1 -->
        <div
          class="box-answers"
          (click)="enableDisableRule1('female')"
          [ngClass]="{ green: !toggle1, white: toggle1 }"
        >
          <div class="text">female</div>
        </div>
        <!-- box1 -->
        <div
          class="box-answers"
          (click)="enableDisableRule2('male')"
          [ngClass]="{ green: !toggle2, white: toggle2 }"
        >
          <div class="text">male</div>
        </div>
        <!-- box1 -->
        <div
          class="box-answers"
          (click)="enableDisableRule3('other')"
          [ngClass]="{ green: !toggle3, white: toggle3 }"
        >
          <div class="text">other</div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./onboarding11.component.scss"],
})
export class Onboarding11Component implements OnInit {
  toggle1 = true;
  toggle2 = true;
  toggle3 = true;
  gender: string;

  constructor(private registerSrv: RegisterService) {
    this.gender = null;
  }

  ngOnInit(): void {}
  enableDisableRule1(gender: string) {
    this.toggle1 = !this.toggle1;
    this.toggle2 = true;
    this.toggle3 = true;
    this.save(gender);
  }
  enableDisableRule2(gender: string) {
    this.toggle2 = !this.toggle2;
    this.toggle1 = true;
    this.toggle3 = true;
    this.save(gender);
  }
  enableDisableRule3(gender: string) {
    this.toggle3 = !this.toggle3;
    this.toggle2 = true;
    this.toggle1 = true;
    this.save(gender);
  }

  save(gender: string) {
    this.registerSrv.getUserInfo().gender = gender;
    console.log(this.registerSrv.getUserInfo().gender);
  }
}
