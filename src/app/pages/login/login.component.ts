import { Component, OnDestroy } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { AuthService } from "src/app/core/services/auth/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnDestroy {
  public loginForm = new FormGroup(
    {
      userName: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    },
    { updateOn: "submit" }
  );
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  public invalidCredentialsErrorMsg$ = this.authService.invalidCredentialsErrorMsgObs;
  private destroy$ = new Subject<boolean>();
  constructor(private authService: AuthService) {}
  /**
   * Destroy data streams
   */
  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  /**
   * Method to send login form to server for authentication
   */
  public loginClicked(): void {
    console.log(this.loginForm.value);
    this.authService.externalLogin(this.loginForm.value);
  }
}
