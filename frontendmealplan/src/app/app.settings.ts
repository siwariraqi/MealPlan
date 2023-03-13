import { Injectable } from "@angular/core";

export class Settings {
  constructor(
    public name: string,
    public theme: string,
    public toolbar: number,
    public stickyMenuToolbar: boolean,
    public header: string,
    public rtl: boolean,
    public adminSidenavIsOpened: boolean,
    public adminSidenavIsPinned: boolean,
    public adminSidenavUserBlock: boolean,

    //additional options
    public mainToolbarFixed: boolean,
    public contentOffsetToTop: boolean,
    public headerBgImage: boolean,
    public headerBgVideo: boolean
  ) {}
}

@Injectable()
export class AppSettings {
  public settings = new Settings(
    "MealPlan", // theme name
    "green", // red, green, blue, pink, purple, grey, orange-dark, custom
    1, // 1
    true, // true = sticky, false = not sticky
    "carousel", // default, image, carousel
    false, // true = rtl, false = ltr
    true, // adminSidenavIsOpened
    true, // adminSidenavIsPinned
    true, // adminSidenavUserBlock

    //NOTE:  don't change additional options values, they used for theme performance
    false,
    false,
    false,
    false
  );
}
