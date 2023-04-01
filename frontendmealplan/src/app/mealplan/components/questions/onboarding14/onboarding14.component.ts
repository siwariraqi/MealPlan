import { Component, OnInit } from "@angular/core";
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
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
        <div [formGroup]="formInfo" class="form__group field inputWrapper">
          <input
            type="input"
            class="form__field"
            placeholder="Name"
            name="name"
            type="number"
            formControlName="heightControl"
            required
            #inputValue
          />
          <p class="val">{{ chosenUnit === "metric" ? "CM" : "FT/IN" }}</p>
        </div>

        <div class="box">
          <div class="innerbox" [ngClass]="{ orange: isMetric, white: !isMetric }">CM</div>
          <div class="innerbox" [ngClass]="{ orange: isImperial, white: !isImperial }">FT IN</div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./onboarding14.component.scss"],
})
export class Onboarding14Component implements OnInit {
  chosenUnit: string;
  formInfo!: UntypedFormGroup;
  isMetric: boolean;
  isImperial: boolean;
  height: string;

  constructor(private formBuilder: UntypedFormBuilder, private registerSrv: RegisterService) {
    this.chosenUnit = this.registerSrv.getUserInfo().unit;
    this.formInfo = this.formBuilder.group({
      heightControl: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.chosenUnit === "metric") {
      this.isMetric = true;
      this.isImperial = false;
    } else {
      this.isMetric = false;
      this.isImperial = true;
    }

    const userInfo = this.registerSrv.getUserInfo();
    if (userInfo && userInfo.infoId) {
      if (userInfo.height && userInfo.height !== "") {
        this.height = userInfo.height;
        this.formInfo.controls["heightControl"].setValue(parseFloat(this.height));
      }
    }

    this.formInfo.controls["heightControl"].valueChanges.subscribe((value) => {
      console.log(value);
      this.registerSrv.getUserInfo().height = value;
      // this.registerSrv.getUserInfo().height = value + ` ${this.chosenUnit === "metric" ? "CM" : "FT"}`;
    });
  }
}
