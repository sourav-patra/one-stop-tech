import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/shared/modules/material.module";
import { ProductItemComponent } from "./components/product-item/product-item.component";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { HomeService } from "./services/home.service";

@NgModule({
  declarations: [HomeComponent, ProductItemComponent],
  imports: [HomeRoutingModule, CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  providers: [HomeService],
})
export class HomeModule {}
