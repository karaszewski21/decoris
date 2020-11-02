import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClientRoutingModule } from "./client-routing.module";
import { ClientComponent } from "./containers/client/client.component";
import { SharedModule } from "../shared/shared.module";
import { ClientNavMarketComponent } from "./components/client-nav-market/client-nav-market.component";
import { ClientNavActionsComponent } from "./components/client-nav-actions/client-nav-actions.component";
import { ClientListComponent } from "./components/client-list/client-list.component";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import {
  clientsReducer,
  filtersReducer,
  parametersReducer,
  ClientEffects,
  ParametersClientEffects,
} from "./store";
import { ClientNavFiltersComponent } from "./components/client-nav-filters/client-nav-filters.component";
import { ClientDialogComponent } from "./components/dialog/client-dialog/client-dialog.component";

@NgModule({
  declarations: [
    ClientComponent,
    ClientNavMarketComponent,
    ClientNavActionsComponent,
    ClientListComponent,
    ClientNavFiltersComponent,
    ClientDialogComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule,
    StoreModule.forFeature("client", {
      clientsReducer,
      filtersReducer,
      parametersReducer,
    }),
    EffectsModule.forFeature([ClientEffects, ParametersClientEffects]),
  ],
  entryComponents: [],
})
export class ClientModule {}
