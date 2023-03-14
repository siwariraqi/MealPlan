import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-onboarding8",
  template: `
    <style>
        .box:hover{
            background: #E09167;
        }
    </style>

    <div class="container">
      <div class='top'> 
      <p class='question'> Are you at risk of any of the following? </p>
        <p class='text'> Select which apply to you </p>
        <p class='line'></p>
        
      </div>
      <div class="content"> 
         <!-- box1 -->
         <div class='box'
        (click)="enableDisableRule1()"
        [ngClass]="{'orange' : !toggle1, 'white': toggle1}"> 
          <div class='text'> Type 2 Diabetes </div> 
        </div>
        
       <!-- box2 -->
        <div class='box'
        (click)="enableDisableRule2()"
        [ngClass]="{'orange' : !toggle2, 'white': toggle2}"> 
          <div class='text'> High Cholesterol  </div> 
        </div>

       <!-- box3 -->
        <div class='box'
        (click)="enableDisableRule3()"
        [ngClass]="{'orange' : !toggle3, 'white': toggle3}"> 
          <div class='text'> High Blood Pressure </div> 
        </div>
      <!-- box4 -->
        <div class='box'
        (click)="enableDisableRule4()"
        [ngClass]="{'orange' : !toggle4, 'white': toggle4}"> 
          <div class='text'> Heart Disease </div> 
        </div>
        <!-- box5 -->
        <div class='box'
        (click)="enableDisableRule5()"
        [ngClass]="{'orange' : !toggle5, 'white': toggle5}"> 
          <div class='text'> Asthma </div> 
        </div>
    </div>
</div>
  `,
  styleUrls: ["./onboarding8.component.scss"],
})
export class Onboarding8Component implements OnInit {

  toggle1 = true;
  toggle2 = true;
  toggle3 = true;
  toggle4 = true;
  toggle5 = true;

  constructor() {}

  ngOnInit(): void {}

  enableDisableRule1() {
    this.toggle1 = !this.toggle1;
  }
  enableDisableRule2() {
    this.toggle2 = !this.toggle2;
  }
  enableDisableRule3() {
    this.toggle3 = !this.toggle3;
  }
  enableDisableRule4() {
    this.toggle4 = !this.toggle4;
  }
  enableDisableRule5() {
    this.toggle5 = !this.toggle5;
  }

}
