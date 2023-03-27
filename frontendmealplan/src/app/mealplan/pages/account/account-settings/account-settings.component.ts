import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/mealplan/services/api.service';
import { UserService } from 'src/app/mealplan/services/user.service';
import { UserSearchPipe } from 'src/app/theme/pipes/user-search.pipe';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../DialogContentComponent/dialog-content.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/mealplan/services/auth.service';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  accountForm: FormGroup;
  hideConfirm = true;
  userId:number;
  
  constructor(private authService:AuthService,private router:Router,private dialog:MatDialog,private userService:UserService, private apiService:ApiService, private snackBar: MatSnackBar) { 
    this.accountForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.userId = this.authService.getUser().userId;
  }

  public confirmDeleteAccount(): void {
    const dialogRef = this.dialog.open(DialogContentComponent, {
        data: { message: 'Are you sure you want to delete your account? This action cannot be undone.' },
    });

    dialogRef.afterClosed().subscribe((result) => {
        if (result === 'confirm') {
            // user confirmed deletion
            this.deleteAccount();
        } else {
            // user cancelled deletion
        }
    });
}

public confirmResetAccount(): void {
  const dialogRef = this.dialog.open(DialogContentComponent, {
      data: { message: 'Are you sure you want to reset your account? This action cannot be undone.' },
  });

  dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
          // user confirmed deletion
          this.resetAccount();
      } else {
          // user cancelled deletion
      }
  });
}

  public deleteAccount(): void {
    const email = this.accountForm.controls['username'].value;
    const password = this.accountForm.controls['password'].value;
    
    if (this.accountForm.valid) {
      this.userService.deleteAccount(email,password).subscribe({
        next: () => {
          console.log('Account deleted successfully.');
          this.snackBar.open('Your account deleted successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
          this.router.navigate(['/mealplan/login']);
        },
        error: (error) => {
          console.error(error);
          this.snackBar.open('FAILED TO DELETE ACCOUNT : ' + error.error, '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        }
    })
    }
    else{
      this.snackBar.open('Wrong information. Please fill the fields and try again.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    }
  }

  public resetAccount(): void {
    const email = this.accountForm.controls['username'].value;
    const password = this.accountForm.controls['password'].value;
    
    if (this.accountForm.valid) {
      this.userService.resetAccount(email,password).subscribe({
        next: () => {
          console.log('Account resetted successfully.');
          this.snackBar.open('Your account resetted successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        },
        error: (error) => {
          console.error(error);
          this.snackBar.open('FAILED TO RESET ACCOUNT : ' + error.error, '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        }
    })
    }
    else{
      this.snackBar.open('Wrong information. Please fill the fields and try again.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    }
  }

}
