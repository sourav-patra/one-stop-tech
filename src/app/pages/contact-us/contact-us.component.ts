import { Component, OnDestroy } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ContactUsService } from "./services/contact-us.service";

@Component({
  selector: "app-contact-us",
  templateUrl: "./contact-us.component.html",
  styleUrls: ["./contact-us.component.scss"],
})
export class ContactUsComponent implements OnDestroy {
  public contactForm = new FormGroup(
    {
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phone: new FormControl("", [
        Validators.required,
        Validators.max(10000000000),
        Validators.min(999999999),
      ]),
      comments: new FormControl(""),
    },
    { updateOn: "change" }
  );
  get f(): { [key: string]: AbstractControl } {
    return this.contactForm.controls;
  }
  private destroy$ = new Subject<boolean>();
  constructor(private contactService: ContactUsService) {}

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
  public submitForm(): void {
    if (this.contactForm.valid) {
      this.contactService
        .submitContactForm(this.contactForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (): void => this.contactForm.reset(),
        });
    }
  }
}
