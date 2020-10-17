import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AuthService } from "../services/auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  public userLoggedIn = false;

  /**
   * Auth guard
   * @param next route snapshot
   * @param state router state
   */
  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isUserLoggedIn().pipe(
      tap((response: boolean) => {
        // if this returns false, then redirect to login page
        if (!response) {
          this.router.navigate(["/login"], {
            queryParams: {
              redirectUrl: state.url,
            },
          });
        }
      })
    );
  }
}
