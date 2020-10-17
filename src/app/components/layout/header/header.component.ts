import { Component } from "@angular/core";
import { AuthService } from "src/app/core/services/auth/auth.service";
import { SharedService } from "src/app/core/services/shared/shared.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  get username(): string {
    return this.sharedService.getUser()?.userName;
  }
  constructor(private authService: AuthService, private sharedService: SharedService) {}

  /**
   * Log out method
   */
  public onLogout(): void {
    this.authService.logoutSession();
  }
}
