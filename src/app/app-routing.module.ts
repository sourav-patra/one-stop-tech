import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/layout/dashboard/dashboard.component";
import { AuthGuard } from "./core/guards/auth.guard";
import { InvalidRouteComponent } from "./pages/invalid-route/invalid-route.component";
import { LoginComponent } from "./pages/login/login.component";

const routes: Routes = [
  { path: "", redirectTo: "/ost/home", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "ost",
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
      },
      {
        path: "home",
        loadChildren: () => import("./pages/home/home.module").then((module) => module.HomeModule),
      },
      {
        path: "about",
        loadChildren: () => import("./pages/about/about.module").then((module) => module.AboutModule),
      },
      {
        path: "contact-us",
        loadChildren: () => import("./pages/contact-us/contact-us.module").then((module) => module.ContactUsModule),
      },
    ],
  },
  { path: "404", component: InvalidRouteComponent },
  { path: "**", redirectTo: "/404" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
