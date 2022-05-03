import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { AuthState } from './auth.state';

const initialState: AuthState = {
  isAuth: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.signIn, (state) => {
    return {
      ...state,
      isAuth: true,
    };
  }),
  on(AuthActions.signOut, (state) => {
    return {
      ...state,
      isAuth: false,
    };
  })
);
