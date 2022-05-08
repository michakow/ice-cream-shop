export interface User {
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
