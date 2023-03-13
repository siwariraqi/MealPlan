import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/theme/utils/app-validators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public infoForm!:UntypedFormGroup; 
  constructor(public formBuilder: UntypedFormBuilder, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.infoForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      phone: ['', Validators.required],
      image: null,      
      organization: null,
      facebook: null,
      twitter: null,
      linkedin: null,
      instagram: null,
      website: null
    }); 
  }

  public onInfoFormSubmit():void {
    if (this.infoForm.valid) { 
      this.snackBar.open('Your account information updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  } 

  public fileChange(files:any){ 
    if(files.length){
      this.infoForm.controls.image.patchValue(files[0].content); 
    } 
    else{
      this.infoForm.controls.image.patchValue(null); 
    }
  } 

}
