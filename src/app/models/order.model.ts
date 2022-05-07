export interface Order {
  client: string;
  date: string;
  order: {
    flavor: string;
    unit: number;
    amount: number;
  }[];
}
