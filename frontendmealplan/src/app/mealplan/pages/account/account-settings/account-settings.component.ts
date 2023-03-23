import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/mealplan/services/api.service';
import { UserService } from 'src/app/mealplan/services/user.service';
import { UserSearchPipe } from 'src/app/theme/pipes/user-search.pipe';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  accountForm: FormGroup;
  
  constructor(private userService:UserService, private apiService:ApiService, private snackBar: MatSnackBar) { 
    this.accountForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    
  }

  public deleteAccount(): void {
    console.log(this.accountForm.controls['username'].value);
    console.log(this.accountForm.controls['password'].value);
    
    if (this.accountForm.valid) {
      this.userService.checkAccount(this.accountForm.controls['username'].value,
      this.accountForm.controls['password'].value).subscribe(
        (userId: number) => {
          // Valid credentials, delete user account
          this.userService.deleteAccount(userId).subscribe(
            () => {
              // Account deleted successfully
              console.log("success :");
              this.snackBar.open('Account deleted successfully', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            },
            (error) => {
              // Handle error
              console.log("delete :"+error);
              this.snackBar.open('Error deleting account. Please try again later.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });

            }
          );
        },
        (error) => {
          console.log("check :"+error.error);
          // Invalid credentials, show error message
          this.snackBar.open('Wrong information. Please fix it and try again.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });

        }
      );
    }
    else{
      this.snackBar.open('Wrong information. Please fill the fields and try again.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    }
  }

  public resetAccount(): void {
    console.log("Resetting...");
  }

}
