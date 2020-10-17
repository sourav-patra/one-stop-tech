import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-invalid-route",
  templateUrl: "./invalid-route.component.html",
  styleUrls: ["./invalid-route.component.scss"],
})
export class InvalidRouteComponent {
  constructor(private router: Router) {}
  /**
   * Redirect to home page
   */
  public redirect(): void {
    this.router.navigate(["/"]);
  }
}
