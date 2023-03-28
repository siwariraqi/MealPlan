import { AfterViewInit, Component, OnInit } from "@angular/core";
import { UntypedFormGroup, UntypedFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AppSettings, Settings } from "src/app/app.settings";
import { AuthService } from "../../services/auth.service";

declare var google: any;

@Component({
  selector: "app-login",
  template: `
    <div class="container">
      <div class="px-3 py-5">
        <div class="theme-container">
          <mat-card class="p-0 o-hidden formContainer">
            <div fxLayout="row wrap ">
              <div class="py-5 formG">
                <div fxLayout="column" fxLayoutAlign="center center" class="text-center">
                  <h1 class="">Sign In</h1>
                  <a mat-button href="/mealplan/register" color="warn" class="w-100">Don't have an account? Sign up now!</a>
                </div>
                <form [formGroup]="loginForm" (ngSubmit)="onLoginFormSubmit()">
                  <mat-form-field appearance="outline" class="w-100 mt-4">
                    <mat-icon matPrefix class="mr-1 text-muted">person</mat-icon>
                    <mat-label>Email</mat-label>
                    <input matInput placeholder="Email" formControlName="email" type="email" required />
                    <mat-error *ngIf="loginForm.controls.email.errors?.required">Email is required</mat-error>

                    <mat-error *ngIf="loginForm.controls.email.hasError('email')">Email address is not valid!</mat-error>
                  </mat-form-field>
                  <mat-form-field appearance="outline" class="w-100 mt-1">
                    <mat-icon matPrefix class="mr-1 text-muted">lock</mat-icon>
                    <mat-label>Password</mat-label>
                    <input matInput placeholder="Password" formControlName="password" required [type]="hide ? 'password' : 'text'" />
                    <mat-error *ngIf="loginForm.controls.password.errors?.required">Password is required</mat-error>

                    <button mat-icon-button matSuffix (click)="hide = !hide" type="button" class="text-muted">
                      <mat-icon>{{ hide ? "visibility_off" : "visibility" }}</mat-icon>
                    </button>
                  </mat-form-field>
                  <mat-error *ngIf="err" class="mt-2"> {{ err }} </mat-error>
                  <mat-slide-toggle color="primary" formControlName="rememberMe" class="my-2 rememberme"
                    >Keep me signed in</mat-slide-toggle
                  >

                  <div class="text-center mt-2">
                    <button mat-raised-button color="accent" class="uppercase loginBtn" type="submit">Sign In</button>
                  </div>
                  <div fxLayout="row" fxLayoutAlign="space-between center" class="mt-3">
                    <div class="divider w-100"></div>
                    <h3 class="text-muted ws-nowrap fw-500 p-2">or Sign in with one click</h3>
                    <div class="divider w-100"></div>
                  </div>
                  <div class="googleBtnWrapper">
                    <div class="text-center py-3" id="googleButtonDiv">
                      <!-- <button class="google" type="button">Google</button> -->
                    </div>
                  </div>
                </form>
                <div fxLayout="row" fxLayoutAlign="end center">
                  <button mat-button>
                    <mat-icon class="text-muted">vpn_key</mat-icon>
                    <span class="mx-1">Reset Password</span>
                  </button>
                </div>
              </div>
            </div>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, AfterViewInit {
  public loginForm!: UntypedFormGroup;
  public hide = true;
  public settings: Settings;

  err: string | null;
  checked: boolean = true;

  constructor(public fb: UntypedFormBuilder, public router: Router, public appSettings: AppSettings, private authSrv: AuthService) {
    this.settings = this.appSettings.settings;
    this.err = "";
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required])],
      rememberMe: false,
    });
    this.loginForm.controls["rememberMe"].setValue(!this.loginForm.controls["rememberMe"].value);
  }

  ngAfterViewInit(): void {
    google.accounts.id.initialize({
      client_id: "844075060169-ld1damjvp1h93mb8p5v8leiu7a6aaod5.apps.googleusercontent.com",
      callback: (response: any) => this.handleGoogleSignIn(response),
    });
    google.accounts.id.renderButton(
      document.getElementById("googleButtonDiv"),
      { locale: "en" } // customization attributes
    );
  }

  public onLoginFormSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.controls["email"].value;
      const password = this.loginForm.controls["password"].value;
      this.authSrv.login(email, password).subscribe((user) => {
        //validate login API
        if (user) {
          if (user.email) {
            console.log(user.email);
            //login success
            this.err = null;
            console.log("login success!");
            console.log(user);

            // alert("user successfully signed in");
            this.router.navigateByUrl("/mealplan/meals");
          } else {
            this.err = "Invalid email / password combination!";
          }
        }
      });
    }
  }

  public handleGoogleSignIn(response: any) {
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
    this.authSrv.loginWithGoogle(response);
  }
}
