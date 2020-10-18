import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/shared/modules/material.module";
import { ConfirmModalComponent } from "./components/confirm-modal/confirm-modal.component";
import { ContactUsRoutingModule } from "./contact-us-routing.module";
import { ContactUsComponent } from "./contact-us.component";
import { ContactUsService } from "./services/contact-us.service";

@NgModule({
  declarations: [ContactUsComponent, ConfirmModalComponent],
  imports: [CommonModule, ContactUsRoutingModule, ReactiveFormsModule, FormsModule, MaterialModule],
  providers: [ContactUsService],
})
export class ContactUsModule {}
