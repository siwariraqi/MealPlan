import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-quantity-counter',
  templateUrl: './quantity-counter.component.html',
  styleUrls: ['./quantity-counter.component.scss']
})
export class QuantityCounterComponent implements OnInit {
  @Input() item:any;
  @Input() value:any = 1;
  @Input() step:number = 1; 
  @Input() min:number = 1; 
  @Input() max:number = 1000; 
  @Input() small:boolean = false; 
  @Output() onCounterChange: EventEmitter<any> = new EventEmitter<any>(); 
  // public value:any = 1;
  constructor() { }

  ngOnInit(): void {
    this.value = (this.value) ? this.value : 1;
  }

  public increment(){
    if(this.value < this.max){
      this.value = this.value + this.step; 
      this.onCounterChange.emit(this.value);
    }   
  }

  public decrement(){
    if(this.value > this.min){
      this.value = this.value - this.step;  
      this.onCounterChange.emit(this.value);
    }  
  }

  public onBlur(){
    console.log(this.value)  
    var reg = new RegExp(/^(|[1-9]\d*)$/); 
    if(!reg.test(this.value)){ 
      this.value = 1;
    }
    else{
      if(this.value > this.max || !this.value){
        this.value = 1;
      }
    } 
  }

  public keyPress(event:any) { 
    if(event.target.value.length == 0 && event.which == 48 ){
      event.preventDefault(); 
      return false;
    } 
    var verified = String.fromCharCode(event.which).match(/[^0-9]/g);
    if (verified) { 
      event.preventDefault(); 
      return false;
    } 
    setTimeout(() => {
      this.onCounterChange.emit(this.value); 
    });

    return true;    
  }
 
}
