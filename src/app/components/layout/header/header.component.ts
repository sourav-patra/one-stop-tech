import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth/auth.service";
import { SharedService } from "src/app/core/services/shared/shared.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  public username$ = this.sharedService.usernameObs;
  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  /**
   * Navigate to home page
   */
  public navigateToHome(): void {
    this.router.navigate(["/"]);
  }

  /**
   * Log out method
   */
  public onLogout(): void {
    this.authService.logoutSession();
  }
}
