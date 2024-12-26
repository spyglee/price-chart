import React, { useState, useMemo } from 'react';
import Swiper from 'react-native-swiper';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ElectricityPrice } from '../src/types/electricityPrices';
import { BarChart, yAxisSides } from 'react-native-gifted-charts';

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
  // const { electricityPrices, isLoading } = useGetElectricityPricesByDay(selectedDate);

  // console.log(electricityPrices);

  return (
    <>
      <View style={{ height: 50, backgroundColor: 'rgb(67, 150, 214)' }} />
      <Swiper
        loop={false}
        showsPagination={false}
        onIndexChanged={(index: number) => {
          const offset = index - 100;
          const date = new Date(baseDate);
          date.setDate(date.getDate() + offset);
          setSelectedDate(date);
        }}
        index={100}
      >
        {Array.from({ length: 200 }).map((_, i) => {
          return (
            <View key={i} style={styles.slide}>
              {/* {isLoading && <ActivityIndicator />} */}
              {/* {!isLoading && ( */}
                <View
                  style={{
                  width: Dimensions.get('window').width - 40,
                  backgroundColor: 'white',
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <BarChart
                  data={dymmyData.map(data => ({ value: data.amount, label: data.hour.toString(), frontColor: data.amount > 0 ? 'orange' : 'green'}))}
                  dashGap={0}
                  spacing={10}
                  width={Dimensions.get('window').width - 110}
                  yAxisSide={yAxisSides.RIGHT}
                  color='grey'
                  barWidth={10}
                  barBorderRadius={10}
                />
              </View>
              {/* )} */}
            </View>
          );
        })}
      </Swiper>
    </>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  dateText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Main;