import { Injectable, OnDestroy } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Observable, Subject } from "rxjs";
import { concatMap, map, pluck, takeUntil } from "rxjs/operators";
import { HttpService } from "src/app/core/services/http/http.service";
import { snakeToCamelCase } from "src/app/core/utils/string-utils";
import {
  ConfirmDialogModel,
  ContactUsFormModel,
  ContactUsResponse,
} from "src/app/shared/models/contact-form.model";
import { IResponseModel } from "src/app/shared/models/response.model";
import { ConfirmModalComponent } from "../components/confirm-modal/confirm-modal.component";

@Injectable({
  providedIn: "root",
})
export class ContactUsService implements OnDestroy {
  private destroy$ = new Subject<boolean>();
  constructor(private httpService: HttpService, private dialog: MatDialog) {}

  /**
   * Destroy data streams
   */
  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  /**
   * Open a dialog to confirm the submission
   * @param responseMessage message received from server confirming the submission
   */
  public openDialog(responseMessage: string): Observable<boolean> {
    const dialogRef: MatDialogRef<ConfirmModalComponent, any> = this.dialog.open(
      ConfirmModalComponent,
      {
        width: "450px",
        height: "200px",
        data: {
          header: "Confirm",
          message: responseMessage,
        } as ConfirmDialogModel,
        autoFocus: false,
        hasBackdrop: true,
        closeOnNavigation: true,
      }
    );

    return dialogRef.afterClosed();
  }

  /**
   * Submit the form
   * @param contactFormValue form data entered by user
   */
  public submitContactForm(contactFormValue: ContactUsFormModel): Observable<boolean> {
    return this.httpService.fetchData(`/contact-info.json`).pipe(
      map((response: IResponseModel<unknown>): any => snakeToCamelCase(response)),
      pluck("data"),
      concatMap(
        (response: ContactUsResponse): Observable<boolean> => this.openDialog(response.message)
      ),
      takeUntil(this.destroy$)
    );
  }
}
