import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { matchingPasswords } from 'src/app/theme/utils/app-validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/mealplan/models/User';
import { UserService } from 'src/app/mealplan/services/user.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {
  public passwordForm!:UntypedFormGroup;
  userId:number;
  user:User ={};
  constructor(public formBuilder: UntypedFormBuilder, public snackBar: MatSnackBar,private userService:UserService) { }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', Validators.required]
    },{validator: matchingPasswords('newPassword', 'confirmNewPassword')});
  }

  public onPasswordFormSubmit():void {
    this.user= JSON.parse(localStorage.get('user'))
    if(matchingPasswords(this.user.password, this.passwordForm.controls['currentPassword'].value)){
      this.user.password= this.passwordForm.controls['newPassword'].value;
      this.userService.updateProfile(this.user).subscribe(
        data => {
          console.log('password updated successfully.');
          this.snackBar.open('Your account information updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
          setTimeout(() => {
            location.reload();
          }, 2000);
        },
        error => {
          console.error('Error updating password:', error);
          this.snackBar.open('An error occurred while updating your profile. Please try again later.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        }
      );
    }

    if (this.passwordForm.valid) {
      this.snackBar.open('Your password changed successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }

}
