import { ElectricityPrices } from "../types/electricityPrices";

export const getElectricityPricesByDay = async ({day, month, year}: {day: number, month: number, year: number}) => {
  const response = await fetch('https://backoffice-acct001.bluecurrent.nl/app/bce_api/api/v1/electricity/prices/day', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token B9D0206779990FA6E0538A3C53D44079',
    },
    body: JSON.stringify({day, month, year}),
  });
  if (!response.ok) {
    throw new Error(response.status.toString());
  }
  const data: ElectricityPrices   = await response.json();
  return data;
};