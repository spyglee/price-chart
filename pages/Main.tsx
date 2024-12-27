import React, { useState, useMemo } from 'react';
import Swiper from 'react-native-swiper';
import { View, StyleSheet, Dimensions, Text, ActivityIndicator } from 'react-native';
import { ElectricityPrice } from '../src/types/electricityPrices';
import BarChart from '../src/ui/BarChart';
import { useGetElectricityPricesByDay } from '../src/hooks/useGetElectricityPricesByDay';
import { BLUE, DARK_GREY, GREEN, LIGHT_GREY, ORANGE, WHITE } from '../src/colors';

const dymmyData: ElectricityPrice[] = [
  {
    "type": "price_per_hour",
    "hour": 3,
    "amount": 0.02,
    "amount_currency": "EUR"
  },
  {
      "type": "price_per_hour",
      "hour": 9,
      "amount": 0.05,
      "amount_currency": "EUR"
  },
  {
      "type": "price_per_hour",
      "hour": 8,
      "amount": 0.05,
      "amount_currency": "EUR"
  },
  {
      "type": "price_per_hour",
      "hour": 1,
      "amount": -0.01,
      "amount_currency": "EUR"
  },
  {
      "type": "price_per_hour",
      "hour": 5,
      "amount": -0.05,
      "amount_currency": "EUR"
  },
  {
      "type": "price_per_hour",
      "hour": 12,
      "amount": -0.01,
      "amount_currency": "EUR"
  },
  {
      "type": "price_per_hour",
      "hour": 6,
      "amount": -0.06,
      "amount_currency": "EUR"
  },
  {
      "type": "price_per_hour",
      "hour": 4,
      "amount": 0.04,
      "amount_currency": "EUR"
  },
  {
      "type": "price_per_hour",
      "hour": 10,
      "amount": 0.04,
      "amount_currency": "EUR"
  },
  {
      "type": "price_per_hour",
      "hour": 2,
      "amount": 0.02,
      "amount_currency": "EUR"
  },
  {
      "type": "price_per_hour",
      "hour": 7,
      "amount": 0.06,
      "amount_currency": "EUR"
  },
  {
      "type": "price_per_hour",
      "hour": 11,
      "amount": 0.03,
      "amount_currency": "EUR"
  }
];

const Main = () => {
  const baseDate = useMemo(() => new Date(), []);
  const [selectedDate, setSelectedDate] = useState(baseDate);
  const { electricityPrices, isLoading, fetchElectricityPrices } = useGetElectricityPricesByDay(selectedDate);

  const onIndexChanged = (index: number) => {
    const offset = index - 100;
    const date = new Date(baseDate);
    date.setDate(date.getDate() + offset);
    setSelectedDate(date);
    fetchElectricityPrices(date);
  };

  return (
    <>
      <View style={{ height: 50, backgroundColor: BLUE }} />
      <Swiper
        loop={false}
        showsPagination={false}
        onIndexChanged={onIndexChanged}
        index={100}
      >
        {Array.from({ length: 200 }).map((_, i) => (
            <View key={i} style={styles.slide}>
              {isLoading && <ActivityIndicator />}
              {!isLoading && (
                <View style={styles.card}>
                  <Text style={styles.dateText}>
                    {selectedDate?.toLocaleDateString()}
                  </Text>
                  <BarChart data={dymmyData.map(data => ({ label: data.hour.toString(), value: data.amount }))} />
                  <View style={styles.legend}>
                    <View style={styles.legendItem}>
                      <View style={[styles.legendItemColor, { backgroundColor: ORANGE }]} />
                      <Text style={styles.legendItemText}>
                        Positive
                      </Text>
                    </View>
                    <View style={styles.legendItem}>
                      <View style={[styles.legendItemColor, { backgroundColor: GREEN }]} />
                      <Text style={styles.legendItemText}>
                        Negative
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
        ))}
      </Swiper>
    </>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: LIGHT_GREY,
  },
  card: {
    width: Dimensions.get('window').width - 40,
    backgroundColor: WHITE,
    padding: 10,
    borderRadius: 10,
  },
  dateText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  legend: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
    gap: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendItemColor: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginRight: 5,
  },
  legendItemText: {
    color: DARK_GREY,
  },
});

export default Main;