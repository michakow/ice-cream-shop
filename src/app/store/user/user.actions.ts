import { createAction, props } from '@ngrx/store';
import { UserState } from './user.state';

export const UserActions = {
  setUser: createAction('[User] Set User', props<UserState>()),
  clearUser: createAction('[User] Clear User Data'),
};
