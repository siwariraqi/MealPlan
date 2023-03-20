import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  accountForm: FormGroup;
  
  constructor() { 
    this.accountForm = new FormGroup({
      username: new FormControl('', [Validators.minLength(3)]),
      password: new FormControl('', [Validators.minLength(3)]),
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  public deleteAccount(): void {
    // logic to delete account goes here
  }

  public resetAccount(): void {
    console.log("Resetting...");
  }

}
