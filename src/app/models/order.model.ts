export interface Order {
  client: string;
  date: string;
  order: {
    flavor: string;
    unit: {
      unitName: string;
      value: number;
    };
    amount: number;
  }[];
}
