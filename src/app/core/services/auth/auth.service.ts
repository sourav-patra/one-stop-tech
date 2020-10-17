import { HttpErrorResponse } from "@angular/common/http";
import { dashCaseToCamelCase } from "@angular/compiler/src/util";
import { Injectable, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject, Subscriber } from "rxjs";
import { map, pluck, takeUntil } from "rxjs/operators";
import { IResponseModel } from "src/app/shared/models/response.model";
import { IUserInfo } from "src/app/shared/models/user.model";
import { snakeToCamelCase } from "../../utils/string-utils";
import { HttpService } from "../http/http.service";
import { SharedService } from "../shared/shared.service";

@Injectable({
  providedIn: "root",
})
export class AuthService implements OnDestroy {
  private isLoggedIn = false; // to keep a track of user session
  private invalidCredentialsErrorMsg$ = new BehaviorSubject<string>(null);
  get invalidCredentialsErrorMsgObs(): Observable<string> {
    return this.invalidCredentialsErrorMsg$;
  }
  private destroy$ = new Subject<boolean>();
  constructor(
    private sharedService: SharedService,
    private apiService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  /**
   * Destroy data streams
   */
  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  /**
   * Set the error message to display when authentication fails
   * @param message message to display
   */
  public setInvalidCredentialsErrorMessage(message: string = null): void {
    this.invalidCredentialsErrorMsg$.next(message);
  }

  /**
   * Method to check whether a user is authenticated
   * either check from cache or refetch from API
   */
  public isUserLoggedIn(): Observable<boolean> {
    return new Observable<boolean>((subscriber: Subscriber<boolean>) => {
      if (this.isLoggedIn) {
        subscriber.next(true);
        subscriber.complete();
      } else {
        const userInfo = this.sharedService.getUserFromStorage();
        if (userInfo?.userName && userInfo?.password) {
          // Credentials present so allow navigation
          subscriber.next(true);
        } else {
          // Credentials not presen so do not allow navigation
          subscriber.next(false);
        }
      }
    });
  }

  /**
   * Method to validate the credentials
   * In real world scenario server handles this
   * @param userInfo response from server (in our case mock)
   * @param formData form data entered by user
   */
  public validateCredentials(serverUserInfo: IUserInfo, formData: IUserInfo): boolean {
    if (serverUserInfo?.userName === formData?.userName && serverUserInfo.password === serverUserInfo?.password) {
      return true;
    }
    return false;
  }

  /**
   * Set loggedIn to true on successful login
   * @param user Object that contains information to be stored in local storage
   */
  public setLogin(user: IUserInfo): void {
    this.isLoggedIn = true;
    this.sharedService.setUser(user);
  }

  /**
   * Function that clears out login data.
   */
  public logoutSession(): void {
    this.isLoggedIn = false;
    this.sharedService.clearUserData();
    this.router.navigate(["/login"]);
  }

  /**
   * Login method
   * @param formData data entered in login form
   */
  public externalLogin(formData: IUserInfo): void {
    this.setInvalidCredentialsErrorMessage();
    this.apiService
      .fetchData(`/user-info.json`)
      .pipe(
        map((response: IResponseModel<unknown>) => snakeToCamelCase(response)),
        pluck("data"),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (userInfo: IUserInfo): void => {
          console.log(userInfo);
          if (userInfo) {
            if (this.validateCredentials(formData, userInfo)) {
              this.setLogin(userInfo);
              // Check for redirect urls if present and then navigate
              const redirectUrl: string = this.activatedRoute.snapshot.queryParams[`redirectUrl`];
              if (redirectUrl) {
                this.router.navigate([redirectUrl]);
              } else {
                this.router.navigate(["/"]);
              }
            } else {
              this.setInvalidCredentialsErrorMessage("Invalid credentials. Please try again.");
            }
          } else {
            this.setInvalidCredentialsErrorMessage("An error has occured. Please try again.");
          }
        },
        error: (): void => this.setInvalidCredentialsErrorMessage("An error has occured. Please try again."),
      });
  }

  /**
   * User log out.
   * Redirect to login page
   */
  public logoutUser(): void {
    this.logoutSession();
    this.router.navigate(["/login"]);
  }
}
