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
import { ClientNavFiltersComponent } from "./components/client-nav-filters/client-nav-filters.component";
import { ClientDialogComponent } from "./containers/client-dialog/client-dialog.component";
import { ClientNavSearchComponent } from "./components/client-nav-search/client-nav-search.component";
import { ClientPaginatorComponent } from "./components/client-paginator/client-paginator.component";
import { ClientFormBaseParametersComponent } from "./components/dialog/step/client-form-base-parameters/client-form-base-parameters.component";
import { ClientFormLocationComponent } from "./components/dialog/step/client-form-location/client-form-location.component";
import { ClientFormBusinessProfileComponent } from "./components/dialog/step/client-form-business-profile/client-form-business-profile.component";
import { ClientFormEmployessComponent } from "./components/dialog/step/client-form-employess/client-form-employess.component";
import { ClientFormFittingsProfilesComponent } from "./components/dialog/step/client-form-fittings-profiles/client-form-fittings-profiles.component";
import { ClientFormNotesComponent } from "./components/dialog/step/client-form-notes/client-form-notes.component";
import { ClientNotesModalComponent } from "./components/dialog/information/client-notes-modal/client-notes-modal.component";
import { ClientEmployeesModalComponent } from "./components/dialog/information/client-employees-modal/client-employees-modal.component";
import { ClientProfilesFittingsModalComponent } from "./components/dialog/information/client-profiles-fittings-modal/client-profiles-fittings-modal.component";
import { SearchMobileModalComponent } from "./components/dialog/mobile/search-mobile-modal/search-mobile-modal.component";
import { FilterMobileModalComponent } from "./components/dialog/mobile/filter-mobile-modal/filter-mobile-modal.component";

import { reducers, ClientEffects, CLIENT_KEY } from "./store";

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
    ClientNotesModalComponent,
    ClientEmployeesModalComponent,
    ClientProfilesFittingsModalComponent,
    SearchMobileModalComponent,
    FilterMobileModalComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule,
    StoreModule.forFeature(CLIENT_KEY, reducers),
    EffectsModule.forFeature([ClientEffects]),
  ],
})
export class ClientModule {}
