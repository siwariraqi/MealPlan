import { Component, OnInit } from "@angular/core";
import { UntypedFormGroup, UntypedFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { matchingPasswords, emailValidator } from "src/app/theme/utils/app-validators";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-register-form",
  template: `
    <div class="container">
      <div class="px-3 py-5 ">
        <div class="theme-container ">
          <mat-card class="p-0 o-hidden px-3 py-3 formContainer">
            <div fxLayout="column">
              <div
                fxFlex="100"
                fxFlex.gt-sm="50"
                class="py-3"
                ngClass.gt-sm="px-5"
                ngClass.sm="px-3"
                ngClass.xs="px-3"
              >
                <div fxLayout="column" fxLayoutAlign="center center" class="text-center ">
                  <h1 class="secondary-font">Register</h1>
                  <a mat-button routerLink="/mealplan/login" color="warn" class="w-100"
                    >Already have an account? Sign in!</a
                  >
                </div>
                <form [formGroup]="registerForm" (ngSubmit)="onRegisterFormSubmit()">
                  <mat-form-field appearance="outline" class="w-100 mt-1">
                    <mat-icon matPrefix class="mr-1 text-muted">email</mat-icon>
                    <mat-label>Email</mat-label>
                    <input matInput placeholder="Email" formControlName="email" required />
                    <mat-error *ngIf="registerForm.controls.email.errors?.required"
                      >Email is required</mat-error
                    >
                    <mat-error *ngIf="registerForm.controls.email.hasError('invalidEmail')"
                      >Invalid email address</mat-error
                    >
                  </mat-form-field>
                  <mat-form-field appearance="outline" class="w-100 mt-1">
                    <mat-icon matPrefix class="mr-1 text-muted">lock</mat-icon>
                    <mat-label>Password</mat-label>
                    <input
                      matInput
                      placeholder="Password"
                      formControlName="password"
                      type="password"
                      minlength="6"
                      required
                      [type]="hide ? 'password' : 'text'"
                    />
                    <mat-error *ngIf="registerForm.controls.password.errors?.required"
                      >Password is required</mat-error
                    >
                    <mat-error *ngIf="registerForm.controls.password.hasError('minlength')"
                      >Password isn't long enough, minimum of 6 characters</mat-error
                    >
                    <button
                      mat-icon-button
                      matSuffix
                      (click)="hide = !hide"
                      type="button"
                      class="text-muted"
                    >
                      <mat-icon>{{ hide ? "visibility_off" : "visibility" }}</mat-icon>
                    </button>
                  </mat-form-field>
                  <mat-form-field appearance="outline" class="w-100 mt-1">
                    <mat-icon matPrefix class="mr-1 text-muted">lock</mat-icon>
                    <mat-label>Confirm Password</mat-label>
                    <input
                      matInput
                      placeholder="Confirm Password"
                      formControlName="confirmPassword"
                      type="password"
                      required
                      [type]="hide ? 'password' : 'text'"
                    />
                    <mat-error *ngIf="registerForm.controls.confirmPassword.errors?.required"
                      >Confirm Password is required</mat-error
                    >
                    <mat-error
                      *ngIf="registerForm.controls.confirmPassword.hasError('mismatchedPasswords')"
                      >Passwords do not match</mat-error
                    >
                    <button
                      mat-icon-button
                      matSuffix
                      (click)="hide = !hide"
                      type="button"
                      class="text-muted"
                    >
                      <mat-icon>{{ hide ? "visibility_off" : "visibility" }}</mat-icon>
                    </button>
                  </mat-form-field>

                  <div class="text-center mt-2">
                    <button
                      mat-raised-button
                      color="accent"
                      class="uppercase signupBtn"
                      type="submit"
                    >
                      Create an Account
                    </button>
                  </div>
                </form>
                <div class="divider mt-4"></div>
                <mat-card-actions fxLayoutAlign="center center" class="text-center">
                  <small class="my-3"
                    >By clicking the "Create an Account" button you agree with our <br />
                    <a mat-button color="primary" class="" disabled="true">Terms and conditions</a>
                  </small>
                </mat-card-actions>
              </div>
            </div>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./register-form.component.scss"],
})
export class RegisterFormComponent implements OnInit {
  public registerForm!: UntypedFormGroup;
  public hide = true;
  public bgImage: any;
  constructor(
    public fb: UntypedFormBuilder,
    public router: Router,
    public snackBar: MatSnackBar,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.bgImage = this.sanitizer.bypassSecurityTrustStyle(
      "url(assets/images/others/register.jpg)"
    );
    this.registerForm = this.fb.group(
      {
        username: ["", Validators.compose([Validators.required, Validators.minLength(6)])],
        email: ["", Validators.compose([Validators.required, emailValidator])],
        password: ["", Validators.required],
        confirmPassword: ["", Validators.required],
        receiveNewsletter: false,
      },
      { validator: matchingPasswords("password", "confirmPassword") }
    );
  }

  public onRegisterFormSubmit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.snackBar.open("You registered successfully!", "×", {
        panelClass: "success",
        verticalPosition: "top",
        duration: 3000,
      });
    }
  }
}
