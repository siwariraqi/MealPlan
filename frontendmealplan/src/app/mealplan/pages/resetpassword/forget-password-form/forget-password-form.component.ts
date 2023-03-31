import { Component, OnInit } from "@angular/core";
import { UntypedFormGroup, UntypedFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AppSettings, Settings } from "src/app/app.settings";
import { AuthService } from "../../../services/auth.service";

declare var google: any;

@Component({
  selector: "app-forget-password-form",
  template: `
    <div class="container">
      <div class="px-3 py-5">
        <div class="theme-container">
          <mat-card class="p-0 o-hidden formContainer">
            <div fxLayout="row wrap ">
              <div class="py-5 formG">
                <div fxLayout="column" fxLayoutAlign="center center" class="text-center">
                  <h1 class="">Reset Your Password</h1>
                  <a mat-button routerLink="/mealplan/login" color="warn" class="w-100">Back to sign in page</a>
                </div>
                <form [formGroup]="forgetForm" (ngSubmit)="formSubmit()">
                  <mat-form-field appearance="outline" class="w-100 mt-4">
                    <mat-icon matPrefix class="mr-1 text-muted">person</mat-icon>
                    <mat-label>Email</mat-label>
                    <input matInput placeholder="Email" formControlName="email" type="email" required />
                    <mat-error *ngIf="forgetForm.controls.email.errors?.required">Email is required</mat-error>
                    <mat-error *ngIf="forgetForm.controls.email.hasError('email')">Email address is not valid!</mat-error>
                  </mat-form-field>
                  <div class="text-center mt-2">
                    <button mat-raised-button color="accent" class="uppercase forgetBtn" type="submit">Send Password Reset Email</button>
                  </div>
                </form>
              </div>
            </div>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./forget-password-form.component.scss"],
})
export class ForgetPasswordFormComponent implements OnInit {
  public forgetForm!: UntypedFormGroup;
  public hide = true;
  public settings: Settings;

  err: string | null;
  checked: boolean = true;

  constructor(public fb: UntypedFormBuilder, public router: Router, public appSettings: AppSettings, private authSrv: AuthService) {
    this.settings = this.appSettings.settings;
    this.err = "";
  }

  ngOnInit(): void {
    this.forgetForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
    });
  }

  public formSubmit(): void {
    if (this.forgetForm.valid) {
      const email = this.forgetForm.controls["email"].value;
      this.authSrv.forgetPassword(email);
      //TODO: reset password logic
    }
  }

  navigateToResetPasswordPage(): void {
    this.router.navigateByUrl("/mealplan/forgetpassword");
  }
}
