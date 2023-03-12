import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyNumberDirective } from './only-number.directive';
import { MaskDateDirective } from './mask-date.directive';
import { PhoneMaskDirective } from './phone-mask.directive';

@NgModule({
  declarations: [
    OnlyNumberDirective,
    MaskDateDirective,
    PhoneMaskDirective
  ],
  exports: [
    OnlyNumberDirective,
    MaskDateDirective,
    PhoneMaskDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
