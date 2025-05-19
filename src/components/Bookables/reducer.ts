import { bookables } from '../../static.json'
import type { GetSingle } from '../../types';

type Action = 
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
  }

type Bookable = GetSingle<typeof bookables>;

type State= {
  group: string;
  bookableIndex: number;
  hasDetails: boolean;
  bookables: Bookable[];
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

    case "TOGGLE_HAS_DETAILS":
      return {
        ...state,
        hasDetails: !state.hasDetails
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
    
    default: 
      return state;
  }
}