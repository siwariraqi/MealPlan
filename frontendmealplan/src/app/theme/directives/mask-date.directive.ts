import { Directive, OnDestroy, ElementRef, Optional, Self } from '@angular/core'; 
import * as textMask from 'vanilla-text-mask/dist/vanillaTextMask.js';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { Subscription, fromEvent } from 'rxjs';

@Directive({
  selector: '[appMaskDate]'
})
export class MaskDateDirective implements OnDestroy { 
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];  
  public maskedInputController:any; 
  public eventSubscription!: Subscription;  

  constructor(@Optional() @Self() public datepickerInput: MatDatepickerInput<any>, private element: ElementRef) {
    this.maskedInputController = textMask.maskInput({
      inputElement: this.element.nativeElement,
      mask: this.mask, 
      guide: true
    }); 
  }

  ngAfterViewInit(){ 
    this.eventSubscription = fromEvent(this.element.nativeElement, 'input').subscribe(_ => {
      this.datepickerInput._onInput(this.element.nativeElement.value);
    });
  } 

  ngOnDestroy() {
    this.maskedInputController.destroy();
    this.eventSubscription.unsubscribe();
  } 

}