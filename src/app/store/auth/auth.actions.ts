import { createAction } from '@ngrx/store';

export const AuthActions = {
  signIn: createAction('[Auth] Sign In User'),
  signOut: createAction('[Auth] Sign Out User'),
};
