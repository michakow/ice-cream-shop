import { AuthState } from './auth';
import { UserState } from './user';

export interface AppState {
  user: UserState;
  auth: AuthState;
}
