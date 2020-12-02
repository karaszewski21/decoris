import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./core/helpers/auth.guard";
import { AppComponent } from "./app.component";

const routes: Routes = [
  {
    path: "client",
    loadChildren: () =>
      import("./client/client.module").then((m) => m.ClientModule),
    //  canActivate: [AuthGuard],
  },
  {
    path: "setting",
    loadChildren: () =>
      import("./setting/setting.module").then((m) => m.SettingModule),
    //  canActivate: [AuthGuard],
  },
  {
    path: "account",
    loadChildren: () =>
      import("./account/account.module").then((m) => m.AccountModule),
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
