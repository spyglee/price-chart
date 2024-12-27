import { useCallback, useEffect, useState } from 'react';
import { ElectricityPrice, ElectricityPrices } from '../types/electricityPrices';
import { Alert } from 'react-native';

export const useGetElectricityPricesByDay = (date: Date) => {
  const [electricityPrices, setElectricityPrices] = useState<ElectricityPrice[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  
  const fetchElectricityPrices = useCallback(async (targetDate: Date) => {
    try {
      setIsLoading(true);
      setElectricityPrices([]);
      const body = {
        day: targetDate.getDate(),
        month: targetDate.getMonth() + 1,
        year: targetDate.getFullYear(),
      };
      const response = await fetch('https://backoffice-acct001.bluecurrent.nl/app/bce_api/api/v1/electricity/prices/day', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token B9D0206779990FA6E0538A3C53D44079',
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(response.status.toString());
      }
      const data: ElectricityPrices = await response.json();
      setElectricityPrices(data.items);
    } catch (error) {
      Alert.alert('Error', `Failed to fetch electricity prices\n ${error}`);
    } finally {
      setIsLoading(false);
    };
  }, []);

  useEffect(() => {
    fetchElectricityPrices(date);
  }, []);

  return { electricityPrices, isLoading, fetchElectricityPrices };
};

