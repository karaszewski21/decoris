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
} from "../core/store";
import { ClientNavFiltersComponent } from "./components/client-nav-filters/client-nav-filters.component";
import { ClientFormBaseParametersComponent } from "./components/dialog/client-form-base-parameters/client-form-base-parameters.component";
import { ClientFormLocationComponent } from "./components/dialog/client-form-location/client-form-location.component";
import { ClientFormBusinessProfileComponent } from "./components/dialog/client-form-business-profile/client-form-business-profile.component";
import { ClientFormEmployessComponent } from "./components/dialog/client-form-employess/client-form-employess.component";
import { ClientFormFittingsProfilesComponent } from "./components/dialog/client-form-fittings-profiles/client-form-fittings-profiles.component";
import { ClientFormNotesComponent } from "./components/dialog/client-form-notes/client-form-notes.component";
import { ClientDialogComponent } from "./containers/client-dialog/client-dialog.component";
import { ClientNavSearchComponent } from "./components/client-nav-search/client-nav-search.component";
import { ClientPaginatorComponent } from "./components/client-paginator/client-paginator.component";

@NgModule({
  declarations: [
    ClientComponent,
    ClientNavMarketComponent,
    ClientNavActionsComponent,
    ClientListComponent,
    ClientNavFiltersComponent,
    ClientDialogComponent,
    ClientFormBaseParametersComponent,
    ClientFormLocationComponent,
    ClientFormBusinessProfileComponent,
    ClientFormEmployessComponent,
    ClientFormFittingsProfilesComponent,
    ClientFormNotesComponent,
    ClientNavSearchComponent,
    ClientPaginatorComponent,
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
  // entryComponents: [
  //   ClientFormBaseParametersComponent,
  //   ClientFormLocationComponent,
  //   ClientFormBusinessProfileComponent,
  //   ClientFormEmployessComponent,
  // ],
})
export class ClientModule {}
