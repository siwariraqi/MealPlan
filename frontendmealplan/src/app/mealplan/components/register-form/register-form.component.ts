import { Component, Input, OnInit } from "@angular/core";
import { UntypedFormGroup, UntypedFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { matchingPasswords, emailValidator } from "src/app/theme/utils/app-validators";
import { DomSanitizer } from "@angular/platform-browser";
import { RegisterService } from "../../services/register.service";
import { User } from "../../models/User";

@Component({
  selector: "app-register-form",
  template: `
    <div class="container">
      <div class="px-3 py-4 ">
        <div class="theme-container ">
          <mat-card class="o-hidden px-3 pt-3 formContainer">
            <div fxLayout="column">
              <div fxFlex="100" fxFlex.gt-sm="50" class="pt-1 pb-0" ngClass.gt-sm="px-4" ngClass.sm="px-3" ngClass.xs="px-3">
                <div fxLayout="column" fxLayoutAlign="center center" class="text-center ">
                  <h2 class="">Register</h2>
                  <a mat-button routerLink="/mealplan/login" color="warn" class="w-100">Already have an account? Sign in!</a>
                </div>
                <form [formGroup]="registerForm" (ngSubmit)="onRegisterFormSubmit()">
                  <div class="mt-2 first-last-name-wrapper gap-2">
                    <mat-form-field appearance="outline">
                      <mat-icon matPrefix class="mr-1 text-muted">person</mat-icon>
                      <mat-label>First Name</mat-label>
                      <input matInput placeholder="First Name" formControlName="fname" required />
                      <mat-error *ngIf="registerForm.controls.fname.errors?.required">First Name is required</mat-error>
                      <mat-error *ngIf="registerForm.controls.fname.hasError('invalidFirstName')">Invalid Input</mat-error>
                    </mat-form-field>
                    <mat-form-field appearance="outline">
                      <mat-icon matPrefix class="mr-1 text-muted">person</mat-icon>
                      <mat-label>Last Name</mat-label>
                      <input matInput placeholder="Last Name" formControlName="lname" required />
                      <mat-error *ngIf="registerForm.controls.lname.errors?.required">Last Name is required</mat-error>
                      <mat-error *ngIf="registerForm.controls.lname.hasError('invalidLastName')">Invalid Input</mat-error>
                    </mat-form-field>
                  </div>
                  <mat-form-field appearance="outline" class="w-100 mt-0">
                    <mat-icon matPrefix class="mr-1 text-muted">email</mat-icon>
                    <mat-label>Email</mat-label>
                    <input matInput placeholder="Email" formControlName="email" required />
                    <mat-error *ngIf="registerForm.controls.email.errors?.required">Email is required</mat-error>
                    <mat-error *ngIf="registerForm.controls.email.hasError('invalidEmail')">Invalid email address</mat-error>
                  </mat-form-field>

                  <mat-form-field appearance="outline" class="w-100 mt-0">
                    <mat-icon matPrefix class="mr-1 text-muted">phone</mat-icon>
                    <mat-label>Phone Number</mat-label>
                    <input matInput placeholder="Phone Number" formControlName="phone" required />
                    <mat-error *ngIf="registerForm.controls.phone.errors?.required">Phone Number is required</mat-error>
                    <mat-error *ngIf="registerForm.controls.phone.hasError('pattern')">
                      Phone number must only include numbers 0-9. minimum 9 and maximum 16"
                    </mat-error>
                  </mat-form-field>

                  <mat-form-field appearance="outline" class="w-100 mt-0">
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
                    <mat-error *ngIf="registerForm.controls.password.errors?.required">Password is required</mat-error>
                    <mat-error *ngIf="registerForm.controls.password.hasError('pattern')">
                      Password must include at least 8 characters, letter, number, cannot include: ./=_-()</mat-error
                    >
                    <button mat-icon-button matSuffix (click)="hide = !hide" type="button" class="text-muted">
                      <mat-icon>{{ hide ? "visibility_off" : "visibility" }}</mat-icon>
                    </button>
                  </mat-form-field>
                  <mat-form-field appearance="outline" class="w-100 mt-0">
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
                    <mat-error *ngIf="registerForm.controls.confirmPassword.errors?.required">Confirm Password is required</mat-error>
                    <mat-error *ngIf="registerForm.controls.confirmPassword.hasError('mismatchedPasswords')"
                      >Passwords do not match</mat-error
                    >
                    <button mat-icon-button matSuffix (click)="hide = !hide" type="button" class="text-muted">
                      <mat-icon>{{ hide ? "visibility_off" : "visibility" }}</mat-icon>
                    </button>
                  </mat-form-field>
                  <div class="text-center mt-2">
                    <button mat-raised-button color="accent" class="uppercase signupBtn" type="submit">Create an Account</button>
                    <div class="mt-3 orRegisterWithGoogle" (click)="goToRegisterWithGoogle()">
                      <h5>Or Sign Up With Google Instead!</h5>
                      <mat-icon>arrow_forward</mat-icon>
                    </div>
                  </div>
                </form>
                <div class="divider mt-3"></div>
                <mat-card-actions fxLayoutAlign="center center" class="text-center">
                  <small class="my-1"
                    >By creating an Account you agree with our <br />
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

  PHONE_PATTERN = "^[0-9]{9,16}$";
  PASSWORD_PATTERN = "^(?=.*[a-z])(?=.*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$";

  constructor(
    public fb: UntypedFormBuilder,
    public router: Router,
    public snackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
    private registerSrv: RegisterService
  ) {}

  ngOnInit() {
    this.bgImage = this.sanitizer.bypassSecurityTrustStyle("url(assets/images/others/register.jpg)");
    this.registerForm = this.fb.group(
      {
        fname: ["", Validators.compose([Validators.required, Validators.minLength(2)])],
        lname: ["", Validators.compose([Validators.required, Validators.minLength(2)])],
        email: ["", Validators.compose([Validators.required, emailValidator])],
        phone: ["", Validators.compose([Validators.required, Validators.pattern(this.PHONE_PATTERN)])],
        password: ["", Validators.compose([Validators.required, Validators.pattern(this.PASSWORD_PATTERN)])],
        confirmPassword: ["", Validators.required],
        receiveNewsletter: false,
      },
      { validator: matchingPasswords("password", "confirmPassword") }
    );
  }

  public capitalizeFirstLetter(str: string): string {
    return str[0].toUpperCase() + str.slice(1);
  }

  public onRegisterFormSubmit(): void {
    if (this.registerForm.valid) {
      const formObj = this.registerForm.value;
      const user = new User(null);
      user.email = formObj.email;
      user.password = formObj.password;
      user.firstName = this.capitalizeFirstLetter(formObj.fname);
      user.lastName = this.capitalizeFirstLetter(formObj.lname);
      user.phoneNumber = formObj.phone;
      user.userInfo = this.registerSrv.getUserInfo();
      this.registerSrv.registerUser(user).subscribe((user) => {
        if (user) {
          this.snackBar.open("You registered successfully!", "×", {
            panelClass: "success",
            verticalPosition: "bottom",
            duration: 3000,
          });
          this.snackBar._openedSnackBarRef.afterDismissed().subscribe(() => {
            this.router.navigateByUrl("/mealplan/login");
          });
        }
      });
    }
  }

  public goToRegisterWithGoogle() {
    this.registerSrv.incrementOnBoardingStep();
  }
}
