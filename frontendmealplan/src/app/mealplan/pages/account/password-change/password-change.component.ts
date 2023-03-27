import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { matchingPasswords } from 'src/app/theme/utils/app-validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/mealplan/models/User';
import { UserService } from 'src/app/mealplan/services/user.service';
import { catchError, of, throwError } from 'rxjs';
import { ChangePasswordRequest } from 'src/app/mealplan/models/ChangePasswordRequest';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../DialogContentComponent/dialog-content.component';
import { AuthService } from 'src/app/mealplan/services/auth.service';

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

  constructor(private authService:AuthService,private dialog:MatDialog, public formBuilder: UntypedFormBuilder, public snackBar: MatSnackBar,private userService:UserService) { }
  
  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$")]],
      confirmNewPassword: ['', [Validators.required]]},
      { 
        validators: this.matchingPasswords('newPassword','confirmNewPassword') 
      });
  }

  public confirmChange(): void {
    const dialogRef = this.dialog.open(DialogContentComponent, {
        data: { message: 'Are you sure you want to change your password?' },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
        if (result === 'confirm') {
            // user confirmed deletion
            this.onPasswordFormSubmit();
        } else {
            // user cancelled deletion
        }
    });
  }

    public onPasswordFormSubmit(): void {
      if (this.passwordForm.valid) {
        this.user = this.authService.getUser();
        this.userId = this.user.userId;
        const currentPassword = this.passwordForm.get('currentPassword').value;
        const newPassword = this.passwordForm.get('newPassword').value;
        const confirmPassword = this.passwordForm.get('confirmNewPassword').value;
        const request: ChangePasswordRequest = {
          userId: this.userId,
          currentPassword: currentPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword
        };
        this.userService.changePassword(request)
          .pipe(
            catchError(error => {
              console.error('Error updating password:', error);
              const errorMessage = 'Failed to change password. Error: ';
              this.snackBar.open(errorMessage + error.error, '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
              return throwError(error); // Return the observable with the error object
            })
          )
          .subscribe(
            () => {
             {
                console.log('password updated successfully.');
                this.snackBar.open('Password changed successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
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

    get f(){
      return this.passwordForm.controls;
    }
    
    matchingPasswords(newPassowrd:any, confirmPassword :any){
      return(formgroup:UntypedFormGroup) =>{
        const password = formgroup.controls[newPassowrd];
        const confirm = formgroup.controls[confirmPassword];
        // if(confirm.errors && password.errors['matchingPasswords']){
        //   return;
        // }
        if(password.value!==confirm.value){
          confirm.setErrors({matchingPasswords:true});
        }
        else{
          confirm.setErrors(null);
        }
    }
  }

}



