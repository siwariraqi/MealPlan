import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { FormControl } from "@angular/forms";
import { RegisterService } from "src/app/mealplan/services/register.service";

@Component({
  selector: "app-onboarding13",
  template: `
    <div class="container">
      <div class="top">
        <p class="question">What is your weight?</p>
        <p class="line"></p>
      </div>
      <div class="content">
        <div class="img">
          <img src=" /assets/images/questions_icons/{{ ['weight2.png'] }}" />
        </div>
        <div class="form__group field">
          <input
            type="input"
            class="form__field"
            name="name"
            type="number"
            [formControl]="weightControl"
            required
            #inputValue
          />
          <p class="val">{{ chosenUnit === "metric" ? "CM" : "LB" }}</p>
          <p></p>
        </div>

        <div class="box">
          <div
            class="innerbox"
            (click)="enableDisableRule1(inputValue.value)"
            [ngClass]="{ orange: toggle1, white: !toggle1 }"
          >
            KG
          </div>
          <div
            class="innerbox"
            (click)="enableDisableRule2(inputValue.value)"
            [ngClass]="{ orange: toggle2, white: !toggle2 }"
          >
            LB
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./onboarding13.component.scss"],
})
export class Onboarding13Component implements OnInit {
  chosenUnit: string;
  weight: number;
  weightControl: FormControl;
  toggle1 = true;
  toggle2 = false;
  valid: boolean;

  constructor(private registerSrv: RegisterService) {
    this.weight = null;
    this.valid = false;
    this.weightControl = new FormControl();
    this.chosenUnit = "metric";
  }

  ngOnInit(): void {
    this.registerSrv.getUserInfo().unit = this.chosenUnit;
    this.weightControl.valueChanges.subscribe((value) => {
      console.log(value);
      this.registerSrv.getUserInfo().weight =
        value + ` ${this.chosenUnit === "metric" ? "KG" : "LB"}`;
    });
  }

  enableDisableRule1(weight: string) {
    this.chosenUnit = "metric";
    this.registerSrv.getUserInfo().unit = this.chosenUnit;

    this.weight = parseInt(weight);
    this.toggle1 = !this.toggle1;
    this.toggle2 = false;
    if (this.weight > 30 && this.weight < 300) {
      this.valid = true;
    } else {
      this.valid = false;
      console.log("not valid");
    }
  }
  enableDisableRule2(weight: string) {
    this.chosenUnit = "imperial";
    this.registerSrv.getUserInfo().unit = this.chosenUnit;

    this.weight = parseInt(weight);
    this.toggle2 = !this.toggle2;
    this.toggle1 = false;

    if (this.weight > 60 && this.weight < 600) {
      this.valid = true;
    } else {
      this.valid = false;
      console.log("not valid");
    }
  }
}
