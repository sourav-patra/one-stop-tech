import { Component, OnDestroy } from "@angular/core";
import { Event, GuardsCheckEnd, NavigationCancel, NavigationEnd, Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import * as CONST from "../../../shared/constants/side-nav.contants";

@Component({
  selector: "app-side-panel",
  templateUrl: "./side-panel.component.html",
  styleUrls: ["./side-panel.component.scss"],
})
export class SidePanelComponent implements OnDestroy {
  public activeRouteIndex = -1;
  public sideNavConstants = CONST.SIDE_NAV_CONST;
  private destroy = new Subject<boolean>();

  constructor(private router: Router) {
    // Listen for url path and highlight the tab as required
    this.router.events.pipe(takeUntil(this.destroy)).subscribe({
      next: (event: Event): void => {
        if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
          this.highlightTabFromRoutepath((event as GuardsCheckEnd).urlAfterRedirects || event.url);
        }
      },
    });
  }

  /**
   * Destroy data streams
   */
  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  /**
   * Route to a new page based on the tab clicked
   * @param selectedRouteIndex index of the tab in side navigation panel
   */
  public navigateToRoute(selectedRouteIndex: number): void {
    this.activeRouteIndex = selectedRouteIndex;
    this.router.navigate([this.sideNavConstants[this.activeRouteIndex].route]);
  }

  /**
   * Highlight the tab based on the route in utl
   * @param urlPath route path
   */
  public highlightTabFromRoutepath(urlPath: string): void {
    const initialRoute: string = urlPath.substring(1).split("/")[1].toLowerCase();
    switch (initialRoute) {
      case CONST.CategoryNames.home:
        this.activeRouteIndex = 0;
        break;
      case CONST.CategoryNames.about:
        this.activeRouteIndex = 1;
        break;
      case CONST.CategoryNames.contact:
        this.activeRouteIndex = 2;
        break;
      default:
        this.activeRouteIndex = -1;
        break;
    }
  }
}
