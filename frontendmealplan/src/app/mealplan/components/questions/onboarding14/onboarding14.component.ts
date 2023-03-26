import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { RegisterService } from "src/app/mealplan/services/register.service";

@Component({
  selector: "app-onboarding14",
  template: `
    <div class="container">
      <div class="top">
        <p class="question">What is your height?</p>
        <p class="line"></p>
      </div>
      <div class="content">
        <div class="img">
          <img src=" /assets/images/questions_icons/{{ ['group2.png'] }}" />
        </div>
        <div class="form__group field">
          <input type="input" class="form__field" placeholder="Name" name="name" [formControl]="heightControl" required #inputValue />
          <p class="val">{{ chosenUnit === "metric" ? "CM" : "FT/IN" }}</p>
          <p></p>
        </div>

        <div class="box">
          <div class="innerbox" [ngClass]="{ orange: isImperial, white: !isImperial }">FT IN</div>
          <div class="innerbox" [ngClass]="{ orange: isMetric, white: !isMetric }">CM</div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./onboarding14.component.scss"],
})
export class Onboarding14Component implements OnInit {
  chosenUnit: string;
  heightControl: FormControl;

  isMetric: boolean;
  isImperial: boolean;

  constructor(private registerSrv: RegisterService) {
    this.chosenUnit = this.registerSrv.getUserInfo().unit;
    this.heightControl = new FormControl();
  }

  ngOnInit(): void {
    if (this.chosenUnit === "metric") {
      this.isMetric = true;
      this.isImperial = false;
    } else {
      this.isMetric = false;
      this.isImperial = true;
    }
    this.heightControl.valueChanges.subscribe((value) => {
      console.log(value);
      this.registerSrv.getUserInfo().height = value;
      // this.registerSrv.getUserInfo().height = value + ` ${this.chosenUnit === "metric" ? "CM" : "FT"}`;
    });
  }
}
