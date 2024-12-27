import { useCallback, useEffect, useState } from 'react';
import { ElectricityPrice, ElectricityPrices } from '../types/electricityPrices';
import { Alert } from 'react-native';
import { getElectricityPricesByDay } from '../api/electricityPrices';

export const useGetElectricityPricesByDay = (date: Date) => {
  const [electricityPrices, setElectricityPrices] = useState<ElectricityPrice[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  
  const fetchElectricityPrices = useCallback(async (targetDate: Date) => {
    const body = {
      day: targetDate.getDate(),
      month: targetDate.getMonth() + 1,
      year: targetDate.getFullYear(),
    };
    try {
      setIsLoading(true);
      setElectricityPrices([]);
      const data = await getElectricityPricesByDay(body);
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

