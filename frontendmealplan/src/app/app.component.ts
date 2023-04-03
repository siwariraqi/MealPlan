import { Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { Settings, AppSettings } from "./app.settings";
import { Router, NavigationEnd } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "./mealplan/services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  public settings: Settings;
  constructor(
    public appSettings: AppSettings,
    public router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    public translate: TranslateService,
    private authSrv: AuthService
  ) {
    this.settings = this.appSettings.settings;
    // translate.addLangs(["en"]);
    translate.setDefaultLang("en");
    translate.use("en");
  }
  ngOnInit(): void {
    this.authSrv.getUser();
  }

  ngAfterViewInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          if (isPlatformBrowser(this.platformId)) {
            window.scrollTo(0, 0);
          }
        });
      }
    });
  }
}
