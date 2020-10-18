import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./components/layout/dashboard/dashboard.component";
import { HeaderComponent } from "./components/layout/header/header.component";
import { SidePanelComponent } from "./components/layout/side-panel/side-panel.component";
import { AboutComponent } from "./pages/about/about.component";
import { ContactUsComponent } from "./pages/contact-us/contact-us.component";
import { HomeComponent } from "./pages/home/home.component";
import { InvalidRouteComponent } from "./pages/invalid-route/invalid-route.component";
import { LoginComponent } from "./pages/login/login.component";
import { MaterialModule } from "./shared/modules/material.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidePanelComponent,
    HeaderComponent,
    DashboardComponent,
    InvalidRouteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
