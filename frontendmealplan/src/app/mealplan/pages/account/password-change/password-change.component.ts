import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { matchingPasswords } from 'src/app/theme/utils/app-validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/mealplan/models/User';
import { UserService } from 'src/app/mealplan/services/user.service';
import { catchError, of, throwError } from 'rxjs';
import { ChangePasswordRequest } from 'src/app/mealplan/models/ChangePasswordRequest';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {
  public passwordForm!:UntypedFormGroup;
  userId:number;
  user:User ={};
  hideCurrent = true;
  hideNew = true;
  hideConfirm = true;

  constructor(public formBuilder: UntypedFormBuilder, public snackBar: MatSnackBar,private userService:UserService) { }
  
  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$")]],
      confirmNewPassword: ['', [Validators.required, this.passwordMatchValidator()]]});
  }

    public onPasswordFormSubmit(): void {
      if (this.passwordForm.valid) {
        this.userId = Number(localStorage.getItem('userId'));
        const currentPassword = this.passwordForm.get('currentPassword').value;
        const newPassword = this.passwordForm.get('newPassword').value;
        const confirmPassword = this.passwordForm.get('confirmNewPassword').value;
        const request: ChangePasswordRequest = {
          userId: Number(localStorage.getItem('userId')),
          currentPassword: currentPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword
        };
        this.userService.changePassword(request)
          .pipe(
            catchError(error => {
              console.error('Error updating password:', error);
              const errorMessage = 'An error occurred while updating your profile. Please try again later.';
              this.snackBar.open(errorMessage, '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
              return throwError(error); // Return the observable with the error object
            })
          )
          .subscribe(
            () => {
             {
                console.log('password updated successfully.');
                this.snackBar.open('Your account information updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
              }
            }
          );
      }
      else {
        // Check if each control is empty and show an error message
        if (this.passwordForm.get('currentPassword').hasError('required')) {
          this.snackBar.open('Current Password is required', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        } else if (this.passwordForm.get('newPassword').hasError('required')) {
          this.snackBar.open('New Password is required', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        } else if (this.passwordForm.get('confirmNewPassword').hasError('required')) {
          this.snackBar.open('Confirm New Password is required', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        } else {
          this.snackBar.open('Wrong information. Please fix it and try again.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        }
      }
    }
    
    private passwordMatchValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const newPassword = this.passwordForm?.get('newPassword')?.value;
        const confirmNewPassword = control?.value;
        return newPassword === confirmNewPassword ? null : { 'passwordMismatch': true };
      };
    }

}



