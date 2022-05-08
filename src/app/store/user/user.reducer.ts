import { createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { UserState } from './user.state';

const initialState: UserState = {
  displayName: '',
  email: '',
  uid: '',
  role: '',
  favoriteFlavors: [],
  lastOrder: {
    date: '',
    orderID: '',
  },
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.setUser, (state, props) => {
    return {
      ...state,
      displayName: props.displayName,
      email: props.email,
      uid: props.uid,
      role: props.role,
      favoriteFlavors: props.favoriteFlavors,
      lastOrder: props.lastOrder,
    };
  }),
  on(UserActions.clearUser, (state) => {
    return {
      ...state,
      ...initialState,
    };
  })
);
