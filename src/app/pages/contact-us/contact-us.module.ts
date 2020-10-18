import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/shared/modules/material.module";
import { ConfirmModalComponent } from "./components/confirm-modal/confirm-modal.component";
import { ContactUsRoutingModule } from "./contact-us-routing.module";

@NgModule({
  declarations: [ConfirmModalComponent],
  imports: [CommonModule, ContactUsRoutingModule, ReactiveFormsModule, FormsModule, MaterialModule],
})
export class ContactUsModule {}
