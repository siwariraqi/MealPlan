import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
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

        <div [formGroup]="formInfo" class="form__group field inputWrapper">
          <input
            type="input"
            class="form__field"
            name="name"
            type="number"
            placeholder="weight"
            formControlName="weightControl"
            required
            #inputValue
          />
          <p class="val">{{ chosenUnit === "metric" ? "KG" : "LB" }}</p>
        </div>

        <div class="box">
          <div class="innerbox" (click)="enableDisableRule1(inputValue.value)" [ngClass]="{ orange: toggle1, white: !toggle1 }">KG</div>
          <div class="innerbox" (click)="enableDisableRule2(inputValue.value)" [ngClass]="{ orange: toggle2, white: !toggle2 }">LB</div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./onboarding13.component.scss"],
})
export class Onboarding13Component implements OnInit {
  chosenUnit: string;
  formInfo!: UntypedFormGroup;
  toggle1 = true;
  toggle2 = false;
  weight: string;

  constructor(private formBuilder: UntypedFormBuilder, private registerSrv: RegisterService) {
    this.chosenUnit = null;
    this.formInfo = this.formBuilder.group({
      weightControl: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.chosenUnit = "metric";
    const userInfo = this.registerSrv.getUserInfo();
    if (userInfo && userInfo.infoId) {
      if (userInfo && userInfo.unit && userInfo.unit !== "") {
        this.chosenUnit = userInfo.unit;
        switch (this.chosenUnit) {
          case "metric":
            this.toggle1 = true;
            this.toggle2 = false;
            break;
          case "imperial":
            this.toggle2 = true;
            this.toggle1 = false;
            break;
        }
      } else {
        this.registerSrv.getUserInfo().unit = this.chosenUnit;
      }
      if (userInfo.weight && userInfo.weight !== "") {
        this.weight = userInfo.weight;
        this.formInfo.controls["weightControl"].setValue(parseInt(this.weight));
      }
    }

    this.formInfo.controls["weightControl"].valueChanges.subscribe((value) => {
      console.log(value);
      this.registerSrv.getUserInfo().weight = value;
      // this.registerSrv.getUserInfo().weight = value + ` ${this.chosenUnit === "metric" ? "KG" : "LB"}`;
    });
  }

  enableDisableRule1(weight: string) {
    this.chosenUnit = "metric";
    this.registerSrv.getUserInfo().unit = this.chosenUnit;
    this.registerSrv.getUserInfo().weight = weight;

    this.toggle1 = !this.toggle1;
    this.toggle2 = false;
  }
  enableDisableRule2(weight: string) {
    this.chosenUnit = "imperial";
    this.registerSrv.getUserInfo().unit = this.chosenUnit;
    this.registerSrv.getUserInfo().weight = weight;

    this.toggle2 = !this.toggle2;
    this.toggle1 = false;
  }
}
