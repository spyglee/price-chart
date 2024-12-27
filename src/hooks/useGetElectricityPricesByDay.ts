import { useCallback, useEffect, useState } from 'react';
import { ElectricityPrice } from '../types/electricityPrices';
import { Alert } from 'react-native';
import { getElectricityPricesByDay } from '../api/electricityPrices';

export const useGetElectricityPricesByDay = (date: Date) => {
  const [electricityPrices, setElectricityPrices] = useState<ElectricityPrice[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  
  const fetchElectricityPrices = useCallback(async (offset: number) => {
    const body = {
      day: date.getDate() - offset,
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
    try {
      setElectricityPrices([]);
      const data = await getElectricityPricesByDay(body);
      setElectricityPrices(prev => [ ...data.items.sort((a, b) => a.hour - b.hour), ...prev]);
    } catch (error) {
      Alert.alert('Error', `Failed to fetch electricity prices\n ${error}`);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    for (let i = 0; i < 5; i++) {
      fetchElectricityPrices(i);
    }
    setIsLoading(false);
  }, []);

  return { electricityPrices, isLoading, fetchElectricityPrices };
};

