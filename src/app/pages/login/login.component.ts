import { Component } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/services/auth/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  public loginForm = new FormGroup(
    {
      userName: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    },
    { updateOn: "change" }
  );
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  public showHidePassword = true;
  public invalidCredentialsErrorMsg$ = this.authService.invalidCredentialsErrorMsgObs;
  constructor(private authService: AuthService) {}

  /**
   * Method to send login form to server for authentication
   */
  public loginClicked(): void {
    this.authService.externalLogin(this.loginForm.value);
  }
}
