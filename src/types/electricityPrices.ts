export type ElectricityPrice = {
  amount: number;
  amount_currency: string;
  hour: number;
  type: string;
};

export type ElectricityPrices = {
  average_price: number;
  command: string;
  date: string;
  success: boolean;
  items: ElectricityPrice[];
};
