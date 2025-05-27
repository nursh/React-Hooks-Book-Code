import type { Bookable } from '../../types';
export type Action = 
  |
    {
      type: "SET_GROUP";
      payload: string;
    }
  | {
      type:  "SET_BOOKABLE";
      payload: number;
  } | {
    type: "TOGGLE_HAS_DETAILS" | "NEXT_BOOKABLE"
  } | {
    type: "FETCH_BOOKABLES_REQUEST"
  } | {
    type: "FETCH_BOOKABLES_SUCCESS",
    payload: Bookable[]
  } | {
    type: "FETCH_BOOKABLES_ERROR",
    payload: {
      message: string;
    };
  }


export type State = {
  group: string;
  bookableIndex: number;
  bookables: Bookable[];
  isLoading: boolean;
  error: boolean | { message: string };
}

export default function reducer(state: State, action: Action): State {

  switch(action.type) {

    case "SET_GROUP":
      return {
        ...state,
        group: action.payload,
        bookableIndex: 0
      };

    case "SET_BOOKABLE":
      return {
        ...state,
        bookableIndex: action.payload
      };

    case "NEXT_BOOKABLE": {
      const count = state.bookables.filter(
        b => b.group === state.group
      ).length;

      return {
        ...state,
        bookableIndex: (state.bookableIndex + 1) % count
      }
    }
    
    case 'FETCH_BOOKABLES_REQUEST': 
      return {
        ...state,
        isLoading: true,
        error: false,
        bookables: []
      }

    case 'FETCH_BOOKABLES_SUCCESS': 
      return {
        ...state,
        isLoading: false,
        bookables: action.payload
      }

    case 'FETCH_BOOKABLES_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    
    default: 
      return state;
  }
}