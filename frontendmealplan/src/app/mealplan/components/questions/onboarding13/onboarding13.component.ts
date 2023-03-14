import { Component, OnInit } from "@angular/core";

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
          /> 
         <p class='val'> {{ val }} <p>
        </div>
        <div class="box">
          <div
            class="innerbox"
            (click)="enableDisableRule1()"
            [ngClass]="{ orange: !toggle1, white: toggle1 }"
          >
            KG
          </div>
          <div
            class="innerbox"
            (click)="enableDisableRule2()"
            [ngClass]="{ orange: !toggle2, white: toggle2 }"
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
  toggle2 = true;
  val : String = "KG";

  constructor() {}

  ngOnInit(): void {}

  enableDisableRule1() {
    this.toggle1 = !this.toggle1;
    this.toggle2 = true;
    this.val = "KG";
  }
  enableDisableRule2() {
    this.toggle2 = !this.toggle2;
    this.toggle1 = true;
    this.val = "LB";

  }
}
