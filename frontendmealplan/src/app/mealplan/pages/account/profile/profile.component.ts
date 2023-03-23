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
    this.userService.getUser(Number(localStorage.getItem('userId'))).subscribe({
      next: (data) => {
        this.user = data;
        // set the value of the form controls using the user object
        this.infoForm.controls['FirstName'].setValue(this.user.firstName);
        this.infoForm.controls['LastName'].setValue(this.user.lastName);
        this.infoForm.controls['email'].setValue(this.user.email);
        this.infoForm.controls['phone'].setValue(this.user.phoneNumber);
        this.infoForm.controls['birthday'].setValue(this.user.userInfo.birthday);
        this.infoForm.controls['genderControl'].setValue(this.user.userInfo.gender);
      },
      error: (error) => {
        console.error('Error fetching user:', error);
        this.snackBar.open('An error occurred while fetching your profile. Please try again later.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    });
  }



  public onInfoFormSubmit(): void {
    // If user object is empty, show an error message and return early
    if (Object.keys(this.user).length === 0) {
      this.snackBar.open('An error occurred while updating your profile. Please try again later.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      return;
    }
  
    // Update user object with form values
    this.updateUserWithFormValues();
  
    // If form is valid, update profile and show success message
    if (this.infoForm.valid) {
      this.userService.updateProfile(this.user)
        .pipe(
          catchError(error => {
            console.error('Error updating profile:', error);
            this.snackBar.open('An error occurred while updating your profile. Please try again later.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
            return of(null);
          })
        )
        .subscribe(data => {
          if (data) {
            console.log('Profile updated successfully.');
          }
        });
        this.snackBar.open('Your account information updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
    // If form is invalid, show error message
    else {
      this.snackBar.open('Wrong information. Please fix it and try again.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    }
  }
  
  private updateUserWithFormValues(): void {
    const formValue = this.infoForm.value;
    const userInfo = this.user.userInfo;
  
    this.user.userId = Number(localStorage.getItem('userId'));
    this.user.firstName = formValue.FirstName || this.user.firstName;
    this.user.lastName = formValue.LastName || this.user.lastName;
    this.user.email = formValue.email || this.user.email;
    this.user.phoneNumber = formValue.phone || this.user.phoneNumber;
    this.user.userInfo.birthday = formValue.birthday || userInfo.birthday;
    this.user.userInfo.gender = formValue.genderControl || userInfo.gender;
  
    if (formValue.birthday === null) {
      this.user.userInfo.birthday = null;
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
