import { Directive, ElementRef } from '@angular/core'; 
import * as textMask from 'vanilla-text-mask/dist/vanillaTextMask.js';  

@Directive({
  selector: '[appPhoneMask]'
})
export class PhoneMaskDirective {
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];  
  public maskedInputController:any;   

  constructor(private element: ElementRef) {
    this.maskedInputController = textMask.maskInput({
      inputElement: this.element.nativeElement,
      mask: this.mask, 
      guide: true
    }); 
  } 

  ngOnDestroy() {
    this.maskedInputController.destroy(); 
  } 

}
