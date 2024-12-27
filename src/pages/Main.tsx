import React, { useMemo } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
// import { DUMMY_DATA } from '../../dummyData'; // Use this instead of real data to see negative price
import BarChart from '../components/BarChart';
import { useGetElectricityPricesByDay } from '../hooks/useGetElectricityPricesByDay';
import { BLUE, DARK_GREY, GREEN, LIGHT_GREY, ORANGE, WHITE } from '../colors';

const Main = () => {
  const { electricityPrices, isLoading } = useGetElectricityPricesByDay(new Date());

  const adjustedData = useMemo(() => {
    return electricityPrices.map(data => ({ label: data.hour.toString(), value: data.amount}));
  }, [electricityPrices]);

  return (
    <>
      <View style={{height: 50, width: '100%', backgroundColor: BLUE }} />
      <View style={styles.slide}>
        {isLoading && <ActivityIndicator />}
        {!isLoading && (
          <BarChart
          data={adjustedData}
          legend={[{ title: 'Positive', color: ORANGE }, { title: 'Negative', color: GREEN }]}
          />
        )}
      </View>
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