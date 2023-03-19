import { Component, OnInit } from "@angular/core";
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
            required
          #inputValue/> 
         <p class='val'> {{ val }} <p>
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
  toggle1 = false;
  toggle2 = false;
  val : String = "KG";
  valid : boolean ;
  WeightNum : Number;

  weight: string;

  constructor(private registerSrv: RegisterService) {
    this.weight = null;
    this.valid = false;
  }
  ngOnInit(): void {}

  enableDisableRule1(weight: string) {
    this.toggle1 = !this.toggle1;
    this.toggle2 = false;
    this.WeightNum = Number(weight);
    if (this.WeightNum > 30 && this.WeightNum < 300){
      this.save(weight);
      this.valid = true;
    }
    else {
      this.valid = false;
      console.log('not valid');
    }
    this.val = "KG";
  }
  enableDisableRule2(weight: string) {
    this.toggle2 = !this.toggle2;
    this.toggle1 = false;
    this.val = "LB";
    this.WeightNum = Number(weight);
    if (this.WeightNum > 60 && this.WeightNum < 600){
      this.save(weight);
      this.valid = true;
    }
    else {
      this.valid = false;
      console.log('not valid');

    }  }

  save(weight: string) {
    this.registerSrv.getUserInfo().weight = weight;
    console.log(this.registerSrv.getUserInfo().weight);
  }
}
