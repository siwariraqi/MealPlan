import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { UntypedFormGroup, UntypedFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { matchingPasswords, emailValidator } from "src/app/theme/utils/app-validators";
import { DomSanitizer } from "@angular/platform-browser";
import { RegisterService } from "../../services/register.service";
import { User } from "../../models/User";

declare var google: any;

@Component({
  selector: "app-register-google",
  template: `
    <div class="container">
      <div class="px-3 py-5 ">
        <div class="theme-container ">
          <mat-card class="o-hidden px-2 py-3 formContainer">
            <div fxLayout="column">
              <div fxFlex="100" fxFlex.gt-sm="50" class="py-3" ngClass.gt-sm="px-4" ngClass.sm="px-3" ngClass.xs="px-3">
                <div fxLayout="column" fxLayoutAlign="center center" class="text-center ">
                  <h3 class="">Register With Google!</h3>
                  <a mat-button href="/mealplan/login" color="warn" class="w-100">Already have an account? Sign in!</a>
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
                    <mat-icon matPrefix class="mr-1 text-muted">phone</mat-icon>
                    <mat-label>Phone Number</mat-label>
                    <input matInput placeholder="Phone Number" formControlName="phone" required />
                    <mat-error *ngIf="registerForm.controls.phone.errors?.required">Phone Number is required</mat-error>
                    <mat-error *ngIf="registerForm.controls.phone.hasError('pattern')">
                      Phone number must only include numbers 0-9. minimum 9 and maximum 16"
                    </mat-error>
                  </mat-form-field>

                  <div class="mt-2">
                    <div class="googleBtnWrapper">
                      <div class="py-3" id="googleButtonDiv">
                        <!-- <button mat-raised-button color="accent" class="uppercase signupBtn" type="submit">Create an Account</button> -->
                      </div>
                    </div>
                    <div class="mt-3 orRegisterWithEmailPassword" (click)="backToNormalForm()">
                      <mat-icon>arrow_backward</mat-icon>
                      <h5 class="mx-1">Sign Up With Email and Password</h5>
                    </div>
                  </div>
                </form>
                <div class="divider mt-3"></div>
                <mat-card-actions fxLayoutAlign="center center" class="text-center">
                  <small class="my-2"
                    >By creating an account you agree with our <br />
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
  styleUrls: ["./register-google.component.scss"],
})
export class RegisterGoogleComponent implements OnInit, AfterViewInit {
  public registerForm!: UntypedFormGroup;
  public hide = true;

  PHONE_PATTERN = "^[0-9]{9,16}$";

  constructor(public fb: UntypedFormBuilder, public router: Router, private registerSrv: RegisterService) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      fname: ["", Validators.compose([Validators.required, Validators.minLength(2)])],
      lname: ["", Validators.compose([Validators.required, Validators.minLength(2)])],
      phone: ["", Validators.compose([Validators.required, Validators.pattern(this.PHONE_PATTERN)])],
      receiveNewsletter: false,
    });
  }

  ngAfterViewInit(): void {
    google.accounts.id.initialize({
      client_id: "844075060169-ld1damjvp1h93mb8p5v8leiu7a6aaod5.apps.googleusercontent.com",
      callback: (response: any) => this.handleGoogleSignUp(response),
    });
    google.accounts.id.renderButton(
      document.getElementById("googleButtonDiv"),
      { locale: "en", text: "signup_with", shape: "circle", width: 230 } // customization attributes
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
        }
      });
    }
  }

  public handleGoogleSignUp(response: any) {
    // console.log(response.credential);

    //decode returned token to object
    let base64Url = response.credential.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    console.log(JSON.parse(jsonPayload));

    //verify token in server
    this.registerSrv.registerWithGoogle(response);
  }

  public backToNormalForm() {
    this.registerSrv.decrementOnBoardingStep();
  }
}
