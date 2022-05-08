export interface UserState {
  uid: string;
  displayName: string;
  email: string;
  role: string;
  favoriteFlavors: string[];
  lastOrder: {
    date: string;
    orderID: string;
  };
}
