import { Company } from "../../../interfaces/client/company";
import { ClientsActions, ClientsActionTypes } from "../actions/clientsAction";

export interface ClientsState {
  loading: boolean;
  clients: Company[];
}

const initialStateClient: ClientsState = {
  loading: false,
  clients: [],
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
        loading: action.payload.loading,
      };
    }

    default: {
      return state;
    }
  }
}
