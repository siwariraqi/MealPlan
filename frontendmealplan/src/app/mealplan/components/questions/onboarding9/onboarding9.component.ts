import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-onboarding9",
  template: `
    <div class="container">
      <div class='top'> 
      <p class='question'> Have you been diagnosed with or received treatment for diabetes? </p>
        <p class='line'></p>
        
      </div>
      <div class="content"> 
      <!-- box1 -->
        <div class='box'
        (click)="enableDisableRule1()"
        [ngClass]="{'orange' : !toggle1, 'white': toggle1}"> 
          <div class='text'> Yes </div> 
        </div>
        
       <!-- box2 -->
        <div class='box'
        (click)="enableDisableRule2()"
        [ngClass]="{'orange' : !toggle2, 'white': toggle2}"> 
          <div class='text'> No </div> 
        </div>

    </div>
</div>
  `,
  styleUrls: ["./onboarding9.component.scss"],
})
export class Onboarding9Component implements OnInit {

  toggle1 = true;
  toggle2 = true;

  constructor() {}

  ngOnInit(): void {}

  enableDisableRule1() {
    this.toggle1 = !this.toggle1;
    this.toggle2 = true;
  }
  enableDisableRule2() {
    this.toggle1 = true;
    this.toggle2 = !this.toggle2;
  }

}
