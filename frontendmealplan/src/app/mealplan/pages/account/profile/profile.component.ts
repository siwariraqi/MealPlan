import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators } from "@angular/forms";
import { emailValidator } from "src/app/theme/utils/app-validators";
import { MatSnackBar } from "@angular/material/snack-bar";
import { User } from "src/app/mealplan/models/User";
import { UserInfo } from "src/app/mealplan/models/UserInfo";
import { UserService } from "src/app/mealplan/services/user.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  public infoForm!: UntypedFormGroup;
  genderFormControl: FormControl;
  userId: number;
  user: User = {};
  userInfo: UserInfo = null;
  constructor(public formBuilder: UntypedFormBuilder, public snackBar: MatSnackBar, private userService: UserService) {}

  ngOnInit() {
    this.user.userInfo = this.userInfo;
    this.genderFormControl = new FormControl();
    this.infoForm = this.formBuilder.group({
      FirstName: ["", Validators.compose([Validators.minLength(3)])],
      LastName: ["", Validators.compose([Validators.minLength(3)])],
      email: ["", Validators.compose([emailValidator])],
      phone: ["", Validators.minLength(9)],
      genderControl: this.genderFormControl,
      birthday: null,
      image: null,
    });
    this.userService.getUser(Number(localStorage.getItem("userId"))).subscribe(
      (data) => {
        this.user = data;
        // set the value of the form controls using the user object
        this.infoForm.controls["FirstName"].setValue(this.user.firstName);
        this.infoForm.controls["LastName"].setValue(this.user.lastName);
        this.infoForm.controls["email"].setValue(this.user.email);
        this.infoForm.controls["phone"].setValue(this.user.phoneNumber);
        this.infoForm.controls["birthday"].setValue(this.user.userInfo.birthday);
        this.infoForm.controls["genderControl"].setValue(this.user.userInfo.gender);
      },
      (error) => console.error("Error fetching user:", error)
    );
  }

  public onInfoFormSubmit(): void {
    this.userId = Number(localStorage.getItem("userId"));
    this.user.userId = this.userId;
    this.user.firstName = this.infoForm.controls["FirstName"].value || this.user.firstName; // use previous value if empty
    this.user.lastName = this.infoForm.controls["LastName"].value || this.user.lastName; // use previous value if empty
    this.user.email = this.infoForm.controls["email"].value || this.user.email; // use previous value if empty
    this.user.phoneNumber = this.infoForm.controls["phone"].value || this.user.phoneNumber; // use previous value if empty
    this.user.userInfo.birthday = this.infoForm.controls["birthday"].value || this.user.userInfo.birthday; // use previous value if empty
    this.user.userInfo.gender = this.infoForm.controls["genderControl"].value || this.user.userInfo.gender; // use previous value if empty

    if (this.infoForm.valid) {
      this.userService.updateProfile(this.user).subscribe(
        (data) => {
          console.log("Profile updated successfully.");
          this.snackBar.open("Your account information updated successfully!", "×", {
            panelClass: "success",
            verticalPosition: "top",
            duration: 3000,
          });
        },
        (error) => console.error("Error updating profile:", error)
      );
    }
  }

  public fileChange(files: any) {
    if (files.length) {
      this.infoForm.controls.image.patchValue(files[0].content);
    } else {
      this.infoForm.controls.image.patchValue(null);
    }
  }
}
