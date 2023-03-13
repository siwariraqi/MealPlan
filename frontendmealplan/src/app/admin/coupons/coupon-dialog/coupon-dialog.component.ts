import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-coupon-dialog',
  templateUrl: './coupon-dialog.component.html',
  styleUrls: ['./coupon-dialog.component.scss']
})
export class CouponDialogComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public menuItems:any[] = []; 
  public form!: UntypedFormGroup;
  constructor(public dialogRef: MatDialogRef<CouponDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: 0, 
      title: ['', Validators.required],
      code: ['', Validators.required],
      desc: null, 
      discountType: null,
      amount: null,
      expiryDate: null,
      allowFreeShipping: false,
      storeId: null,
      showOnStore: false,
      restriction: this.fb.group({ 
        minimumSpend: null,
        maximumSpend: null,
        individualUseOnly: false,
        excludeSaleItems: false,
        menuItems: [[]],
        categories: [[]]
      }),
      limit: this.fb.group({ 
        perCoupon: null,
        perItems: null,
        perUser: null
      }) 
    }); 

    if(this.data.coupon){
      this.form.patchValue(this.data.coupon);
      this.menuItems = this.data.coupon.restriction.menuItems;
    };
  }

  public onSubmit(){
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
    }
  } 

  public addMenuItem(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value; 
    if ((value || '').trim()) {
      this.menuItems.push( value.trim() );
    } 
    if (input) {
      input.value = '';
    }  
    (this.form['controls'] as any).restriction['controls'].menuItems.patchValue(this.menuItems);
  }

  public removeMenuItem(item: any): void {
    const index = this.menuItems.indexOf(item); 
    if (index >= 0) {
      this.menuItems.splice(index, 1);
    }
    (this.form['controls'] as any).restriction['controls'].menuItems.patchValue(this.menuItems);
  }


}
