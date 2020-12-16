import { Company } from "../../../interfaces/client/company";
import { ClientsActions, ClientsActionTypes } from "../actions/clientsAction";
import { Filter } from "../../../interfaces/client/filter";

export interface State {
  loading: boolean;
  clients: Company[];
  count: number;
  filter: Filter;
}

export const initialStateClient: State = {
  loading: false,
  clients: [],
  count: 0,
  filter: {
    business_profiles: [],
    cities: [],
    limit: 0,
    offset: 0,
    name: [],
    country: "",
    voivodeships: [],
  },
};

export function clientsReducer(
  state = initialStateClient,
  action: ClientsActions
) {
  switch (action.type) {
    case ClientsActionTypes.GetClients: {
      return {
        ...state,
        loading: action.payload.loading,
      };
    }

    case ClientsActionTypes.GetClientsSuccess: {
      return {
        ...state,
        clients: action.payload.companies,
        count: action.payload.count,
        loading: action.payload.loading,
      };
    }

    case ClientsActionTypes.ExportClients: {
      return {
        ...state,
        loading: action.payload.loading,
      };
    }

    case ClientsActionTypes.ExportClientsSuccess: {
      return {
        ...state,
        loading: action.payload.loading,
      };
    }

    default: {
      return state;
    }
  }
}
