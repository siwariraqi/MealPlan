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
        <div class="box-answers" (click)="enableDisableRule1('female')" [ngClass]="{ green: toggle1, white: !toggle1 }">
          <div class="text">female</div>
        </div>
        <!-- box1 -->
        <div class="box-answers" (click)="enableDisableRule2('male')" [ngClass]="{ green: toggle2, white: !toggle2 }">
          <div class="text">male</div>
        </div>
        <!-- box1 -->
        <div class="box-answers" (click)="enableDisableRule3('other')" [ngClass]="{ green: toggle3, white: !toggle3 }">
          <div class="text">other</div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./onboarding11.component.scss"],
})
export class Onboarding11Component implements OnInit {
  toggle1 = false;
  toggle2 = false;
  toggle3 = false;
  gender: string;
  valid: boolean;

  constructor(private registerSrv: RegisterService) {
    this.gender = null;
    this.valid = false;
  }

  ngOnInit(): void {
    const userInfo = this.registerSrv.getUserInfo();
    if (userInfo && userInfo.infoId) {
      if (userInfo.gender && userInfo.gender !== "") {
        this.gender = userInfo.gender;
        switch (this.gender) {
          case "female":
            this.enableDisableRule1(this.gender);
            break;
          case "male":
            this.enableDisableRule2(this.gender);
            break;
          case "other":
            this.enableDisableRule3(this.gender);
            break;
        }
      }
    }
  }

  enableDisableRule1(gender: string) {
    //female
    this.toggle1 = !this.toggle1;
    this.toggle2 = false;
    this.toggle3 = false;
    this.save(gender);
    this.validation();
  }
  enableDisableRule2(gender: string) {
    //male
    this.toggle2 = !this.toggle2;
    this.toggle1 = false;
    this.toggle3 = false;
    this.save(gender);
    this.validation();
  }
  enableDisableRule3(gender: string) {
    //other
    this.toggle3 = !this.toggle3;
    this.toggle2 = false;
    this.toggle1 = false;
    this.save(gender);
    this.validation();
  }

  save(gender: string) {
    this.registerSrv.getUserInfo().gender = gender;
    console.log(this.registerSrv.getUserInfo().gender);
  }

  validation(): any {
    // if ( this.toggle1 || this.toggle2 || this.toggle3 ){
    //   this.valid = true;
    //   console.log("Valid")
    // }
    if (this.toggle1 == false && this.toggle2 == false && this.toggle3 == false) {
      this.valid = false;
      console.log("not valid");
    } else {
      this.valid = true;
      console.log("Valid");
    }
    // this.sendData.emit(this.valid);
  }
}
