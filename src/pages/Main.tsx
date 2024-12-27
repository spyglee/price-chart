import React, { useState, useMemo } from 'react';
import Swiper from 'react-native-swiper';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
// import { DUMMY_DATA } from '../../dummyData'; // Use this instead of real data to see negative price
import BarChart from '../components/BarChart';
import { useGetElectricityPricesByDay } from '../hooks/useGetElectricityPricesByDay';
import { BLUE, DARK_GREY, GREEN, LIGHT_GREY, ORANGE, WHITE } from '../colors';

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

  const adjustedData = useMemo(() => {
    return electricityPrices.sort((a, b) => a.hour - b.hour).map(data => ({ label: data.hour.toString(), value: parseFloat(data.amount.toFixed(2)) }));
  }, [electricityPrices]);

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
                <BarChart
                  data={adjustedData}
                  title={selectedDate?.toLocaleDateString()}
                  legend={[{ title: 'Positive', color: ORANGE }, { title: 'Negative', color: GREEN }]}
                />
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