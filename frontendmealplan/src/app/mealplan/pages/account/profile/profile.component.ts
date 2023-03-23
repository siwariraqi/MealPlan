import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/theme/utils/app-validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/mealplan/models/User';
import { UserInfo } from 'src/app/mealplan/models/UserInfo';
import { UserService } from 'src/app/mealplan/services/user.service';
import { catchError, of } from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})


export class ProfileComponent implements OnInit {
  public infoForm!:UntypedFormGroup; 
  genderFormControl: FormControl;
  userId:number;
  user:User ={};
  today: Date = new Date();
  userInfo:UserInfo={};
  
  constructor(public formBuilder: UntypedFormBuilder, public snackBar: MatSnackBar,private userService:UserService) { }
  
  ngOnInit() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const maxDate = new Date();
    this.genderFormControl = new FormControl();
    this.infoForm = this.formBuilder.group({
      FirstName: ['', Validators.compose([ Validators.minLength(3)])],
      LastName: ['', Validators.compose([ Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.pattern(emailRegex)])],
      phone: ['', Validators.pattern(/^\+(?:[0-9] ?){6,14}[0-9]$/)],
      genderControl: this.genderFormControl,
      birthday: new FormControl('', [
        Validators.pattern('^\\d{4}-\\d{2}-\\d{2}$'),
        ageValidator // add custom age validator
      ]),
      image: null
    });
    this.userService.getUser(Number(localStorage.getItem('userId'))).subscribe(
      data => {
         this.user = data;
         // set the value of the form controls using the user object
         this.infoForm.controls['FirstName'].setValue(this.user.firstName);
         this.infoForm.controls['LastName'].setValue(this.user.lastName);
         this.infoForm.controls['email'].setValue(this.user.email);
         this.infoForm.controls['phone'].setValue(this.user.phoneNumber);
         this.infoForm.controls['birthday'].setValue(this.user.userInfo.birthday);
         this.infoForm.controls['genderControl'].setValue(this.user.userInfo.gender);
      },
      error => console.error('Error fetching user:', error)
   );
  }



  public onInfoFormSubmit():void {
    if (Object.keys(this.user).length === 0) {
      this.snackBar.open('An error occurred while updating your profile. Please try again later.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      return;
    }
    this.userId = Number(localStorage.getItem('userId'));
    this.user.userId=this.userId;
    this.user.firstName=this.infoForm.controls['FirstName'].value || this.user.firstName; // use previous value if empty
    this.user.lastName=this.infoForm.controls['LastName'].value || this.user.lastName; // use previous value if empty
    this.user.email=this.infoForm.controls['email'].value || this.user.email; // use previous value if empty
    this.user.phoneNumber=this.infoForm.controls['phone'].value || this.user.phoneNumber; // use previous value if empty
    this.user.userInfo.birthday=this.infoForm.controls['birthday'].value || this.user.userInfo.birthday; // use previous value if empty
    if(this.infoForm.controls['birthday'].value === null) {
      this.user.userInfo.birthday = null;
    }
    this.user.userInfo.gender=this.infoForm.controls['genderControl'].value || this.user.userInfo.gender; // use previous value if empty

    if (this.infoForm.valid) {
      this.userService.updateProfile(this.user)
        .pipe(
          catchError(error => {
            console.error('Error updating profile:', error);
            this.snackBar.open('An error occurred while updating your profile. Please try again later.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
            return of(null); // Return an observable with null value to continue the observable chain
          })
        )
        .subscribe(
          data => {
            if (data) { // Only execute the success logic if data is not null
              console.log('Profile updated successfully.');
            }
          }
        );
        this.snackBar.open('Your account information updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
    else{
      this.snackBar.open('Wrong information. Please fix it and try again.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
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

function ageValidator(control: FormControl): { [key: string]: boolean } | null {
  const currentDate = new Date();
  const birthday = new Date(control.value);
  const ageInYears = currentDate.getFullYear() - birthday.getFullYear();
  if (ageInYears < 18 || ageInYears > 120) {
    return { 'invalidAge': true };
  }
  return null;
}
