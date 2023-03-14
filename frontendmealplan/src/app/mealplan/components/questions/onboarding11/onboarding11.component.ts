import { Component, OnInit } from "@angular/core";

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
          class="box"
          (click)="enableDisableRule1()"
          [ngClass]="{ orange: !toggle1, white: toggle1 }"
        >
          <div class="text">female</div>
        </div>
        <!-- box1 -->
        <div
          class="box"
          (click)="enableDisableRule2()"
          [ngClass]="{ orange: !toggle2, white: toggle2 }"
        >
          <div class="text">male</div>
        </div>
        <!-- box1 -->
        <div
          class="box"
          (click)="enableDisableRule3()"
          [ngClass]="{ orange: !toggle3, white: toggle3 }"
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
  constructor() {}

  ngOnInit(): void {}
  enableDisableRule1() {
    this.toggle1 = !this.toggle1;
    this.toggle2 = true;
    this.toggle3 = true;
  }
  enableDisableRule2() {
    this.toggle2 = !this.toggle2;
    this.toggle1 = true;
    this.toggle3 = true;
  }
  enableDisableRule3() {
    this.toggle3 = !this.toggle3;
    this.toggle2 = true;
    this.toggle1 = true;
  }
}
