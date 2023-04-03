import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-logout",
  template: ` <p>logout works!</p> `,
  styleUrls: ["./logout.component.scss"],
})
export class LogoutComponent implements OnInit {
  constructor(private authSrv: AuthService) {}

  ngOnInit(): void {
    this.authSrv.logout();
  }
}
